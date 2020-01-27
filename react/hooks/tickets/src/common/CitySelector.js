import React, { useState, useMemo, useEffect, memo } from "react";
import Proptypes from "prop-types";
import classnames from "classnames";
import "./CitySelector.css";

const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});
CityItem.propTypes = {
  name: Proptypes.string.isRequired,
  onSelect: Proptypes.func.isRequired
};

const CitySelection = memo(function CitySelection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul" data-cate={title}>
      <li className="city-li" key="title">
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem
            key={city.name}
            name={city.name}
            onSelect={onSelect}
          ></CityItem>
        );
      })}
    </ul>
  );
});
CitySelection.propTypes = {
  title: Proptypes.string.isRequired,
  cities: Proptypes.array,
  onSelect: Proptypes.func.isRequired
};
const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});
AlphaIndex.propTypes = {
  alpha: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired
};

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

const CityList = memo(function CityList(props) {
  const { sections, onSelect, toAlpha } = props;
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySelection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            ></CitySelection>
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return <AlphaIndex key={alpha} onClick={toAlpha} alpha={alpha} />;
        })}
      </div>
    </div>
  );
});
CityList.propTypes = {
  sections: Proptypes.array.isRequired,
  onSelect: Proptypes.func.isRequired,
  toAlpha: Proptypes.func.isRequired
};
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props;
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});
SuggestItem.propTypes = {
  name: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired
};

const Suggest = memo(function Suggest(props) {
  const { searchKey, onClick } = props;
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/api/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        if (sKey === searchKey) {
          setResult(result);
          return;
        }
      });
  }, [searchKey]);
  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: searchKey }];
    }
    return result;
  }, [result, searchKey]);
  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
});
Suggest.propTypes = {
  searchKey: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired
};
const CitySelector = memo(function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;

  const [searchKey, setSearchKey] = useState("");

  // 返回useMemo的值,性能优化
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  useEffect(() => {
    if (!show || cityData || isLoading) return;
    fetchCityData();
    // 如果返回接口失败,isLoading的依赖会导致一直请求接口
  }, [show, cityData, fetchCityData, isLoading]);

  const toAlpha = alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  };

  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>;
    }
    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }
    return <div>error</div>;
  };
  return (
    <div
      className={classnames("city-selector", {
        hidden: !show
      })}
    >
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市/车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={classnames("search-clean", { hidden: key.length === 0 })}
          onClick={() => setSearchKey("")}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={key} onClick={key => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
});

CitySelector.propTypes = {
  show: Proptypes.bool.isRequired,
  cityData: Proptypes.object,
  isLoading: Proptypes.bool.isRequired,
  onBack: Proptypes.func.isRequired,
  fetchCityData: Proptypes.func.isRequired,
  onSelect: Proptypes.func.isRequired
};
export default CitySelector;
