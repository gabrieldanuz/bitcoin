import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';
import QuotationItems from './src/components/QuotationsList/QuotationsItems';

function addZero(number) {
  if (number <= 9) {
    return "0" +number
  }
  return number
}

function url(qtdDays) {
const date = new Date();
const listLastDays = qtdDays;
const end_date = 
`${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`;
date.getDate(date.getDate() - listLastDays)
const start_date =
`${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`;
return ` https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`
}

async function getListCoins(url) {
  let response = await fetch(url);
  let returnApi = await response.json()
  let selectListQuotations = returnApi.bpi
  const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
    return {
      data: key.split("-").reverse().join("/"),
      valor: selectListQuotations[key]
    };
  });
  let data = queryCoinsList.reverse();
  console.log(data);
}

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json()
  let selectListQuotationsG = returnApiG.bpi
  const queryCoinsList = Object.keys(selectListQuotationsG).map((key) => {
      selectListQuotationsG[key]
  });
  let dataG = queryCoinsList;
  console.log(dataG);
}

export default function App() {
const [coinsList, setCoinsList] = useState([])
const [coinsGraphicList, setCoinsGraphicList] = useState([0])
const [days, setDays] = useState(30);
const [updateData, setUpdateData] = useState(true);


function updateDay (number) {
  setDays (number);
  setUpdateData(true);
}

useEffect (() => {
  getListCoins(url(days)).then((data) => {
    setCoinsList(data)
  })

  getPriceCoinsGraphic(url(days)).then((dataG) => {
    setCoinsGraphicList(dataG);
  })

  if(updateData) {
    setUpdateData(false)
  }

},[updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
      backgroundColor="#f50d41"
      barStyle="light-content"
      />
      <CurrentPrice />
      <HistoryGraphic />
      <QuotationsList filterDay ={updateDay} listTransactions={coinsList}/>
      <QuotationItems />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40: 0,
  },
});
