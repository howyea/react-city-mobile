React City Mobile
====================

## Introduction
![](https://github.com/huiyuye/react-city-mobile/blob/master/images/demo_img.jpg)
## Installation

```
npm install --save react-city-mobile
```
or
```
yarn install react-city-mobile
```

## How to use?
```
import React from 'react';
import RCity from 'react-city-mobile';
const cityData = require('../city.json');
const ChoiceCityTest = props => {
> return (
>> <RCity citys={ cityData }></RCity>
>  )
}
export default ChoiceCityTest;
```
### Props
`citys` is the data source for the entire component.
### Data Format (Importance!!)
```
{
    "resCitys": {
      "A": [  //catalog name
        {
          "region_id": "807",
          "name": "阿克苏" //city name
        },
      ],
      "B": [
        {
          "region_id": "807",
          "name": "阿克苏"
        }
      ]
    },
    "hots": [
      {
        "region_id": "813",
        "name": "阿勒泰"
      }
    ]
}
```