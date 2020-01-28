const express = require("express");
const dayjs = require("dayjs");
const app = express();
const cities = require("./json/cities.json");
const query = require("./json/query.json");
const port = 5000;
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello express");
  res.end();
});
app.get("/cities", (req, res) => {
  return res.json(cities);
});
app.get("/query", (req, res) => {
  return res.json(query);
});
app.get("/order", (req, res) => {
  const { date } = req.query;

  return res.json({
    departTimeStr: "07:15",
    arriveTimeStr: "11:47",
    arriveDate: dayjs(date).valueOf(),
    durationStr: "4小时32分",
    price: 483.5
  });
});
app.get("/schedule", (req, res) => {
  return res.json([
    {
      station: "北京南",
      arriveTime: null,
      departTime: "07:20",
      stay: null
    },
    {
      station: "天津南",
      arriveTime: "07:54",
      departTime: "07:56",
      stay: 2
    },
    {
      station: "南京南",
      arriveTime: "11:51",
      departTime: "11:53",
      stay: 2
    },
    {
      station: "上海虹桥",
      arriveTime: "13:08",
      departTime: null,
      stay: null
    }
  ]);
});
app.get("/ticket", (req, res) => {
  const { date } = req.query;

  return res.json({
    detail: {
      departTimeStr: "07:15",
      arriveTimeStr: "11:47",
      arriveDate: dayjs(date).valueOf(),
      durationStr: "4小时32分"
    },
    candidates: [
      {
        type: "二等座",
        priceMsg: "443.5",
        ticketsLeft: "有票",
        channels: [
          {
            name: "快速预订",
            desc: "含40元出行保障 快速出票 迅捷无忧"
          },
          {
            name: "普通预订",
            desc: "出票较慢，高峰期需要排队"
          }
        ]
      },
      {
        type: "一等座",
        priceMsg: "748.5",
        ticketsLeft: "有票",
        channels: [
          {
            name: "快速预订",
            desc: "含40元出行保障 快速出票 迅捷无忧"
          },
          {
            name: "普通预订",
            desc: "出票较慢，高峰期需要排队"
          }
        ]
      },
      {
        type: "商务座",
        priceMsg: "1403.5",
        ticketsLeft: "5张",
        channels: [
          {
            name: "快速预订",
            desc: "含40元出行保障 快速出票 迅捷无忧"
          },
          {
            name: "普通预订",
            desc: "出票较慢，高峰期需要排队"
          }
        ]
      }
    ]
  });
});
app.get("/search", (req, res) => {
  const { key } = req.query;
  return res.json({
    result: [
      {
        key: "芜湖",
        display: "芜湖"
      },
      {
        key: "井冈山",
        display: "井冈山"
      },
      {
        key: "铁岭",
        display: "铁岭"
      }
    ],
    searchKey: key
  });
});

// app.post()
app.listen(port, () => {
  console.log(port);
});
