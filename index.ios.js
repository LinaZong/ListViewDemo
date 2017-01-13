/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

/************************demo1*****************************************/
//导入json数据
var wine = require('./Wine.json');//数组
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var ListViewDemo = React.createClass({
  //1.设置初始值
    getInitialState(){
      //1.1设置数据源
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      //1.2设置返回数据
      return{
        dataSource:ds.cloneWithRows(wine)
      }
    },
    //设置render函数
  render(){
   return(

       <ListView
           dataSource={this.state.dataSource}//数据源
           renderRow={this.renderRow}
       />



   );
  },

  //返回具体的cell
   renderRow(rowData,sectionID,rowID,highlightRow){
  // console.log(sectionID,rowID)
     return(
         <TouchableOpacity activeOpacity={0.5} >
         <View style={styles.container}>
           {/*图片 */}
       <Image  source={{uri:rowData.image}} style={styles.imageStyle}/>
           {/*标题价格*/}
           <View style={styles.wineTextStyle}>
           <Text style={styles.wineTitleStyle}>{rowData.name}</Text>
             <Text style={styles.winepriceStyle}>${rowData.money}</Text>
         </View>
         </View>
           </TouchableOpacity>
);

},


});


const styles = StyleSheet.create({
  container: {
backgroundColor:'white',
    borderBottomWidth:0.5,
    borderBottomColor:'gray',
    flexDirection:'row',
    padding:10



  },
  imageStyle: {
    marginTop:10,
    width:60,
    height:60
  },

  wineTextStyle:{
    marginTop:10,
    marginLeft:10,
    justifyContent:'center',
    marginBottom:10

  },
  wineTitleStyle:{
    width:width * 0.75,


  },
  winepriceStyle:{
   color:'red',
   marginBottom:10
  }

});


/*****************************demo2九宫格***************************************/
var  shareData = require('./shareData.json');
var screenWidth = require('Dimensions').get('window').width;
var  cols = 3;
var  cellW = 100;
var vMargin = (screenWidth - cellW * cols) /(cols + 1);
var  hMargin = 25;
var ListViewDemo1 = React.createClass({

    getInitialState(){
      var shareDs = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        return{

            dataSource:shareDs.cloneWithRows(shareData.data)
        }
    },

    render(){
        return(

                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          contentContainerStyle={demo2Style.listViewStyle}
                          removeClippedSubviews={false}
                >


                </ListView>

        );
    },
    renderRow(data){
return(

    <View style={demo2Style.cellBackStyle}>
        <TouchableOpacity>
        <Image source={{uri:data.icon}} style={{width:80,height:80}} >
        </Image>
        <Text>{data.title}</Text>
            </TouchableOpacity>
    </View>

    );


    }
});
const  demo2Style = StyleSheet.create({
  listViewStyle:{
      flexDirection:'row',
      // // 多行显示
        flexWrap:'wrap',


  },
    cellBackStyle:{
      width:cellW,
        height:cellW,
        marginLeft:vMargin,
        marginTop:hMargin,
        alignItems:'center'

    }
    }


);

/***********************************Demo3添加头视图************************/

var careData = require('./Car.json');
var ListViewDemo2 = React.createClass({
    getInitialState(){
 var getSelectionData = (dataBlob,sectionID) =>{
     return dataBlob[sectionID];
 };

 var  getRowData = (dataBlob,sectionID,rowID) =>{
     return dataBlob[sectionID+ ':' + rowID];

 };
        return{
            dataSource: new  ListView.DataSource({
                getSectionData:getSelectionData,
                getRowData:getRowData,
                rowHasChanged:(r1,r2) => r1 !== r2,
                sectionHeaderHasChanged:(r1,r2) => r1 !== r2,
            })
        }
    },

    componentDidMount(){

        //调用json数据
        this.loadedDataFromJson();

    },
    loadedDataFromJson(){

        var jsonData= careData.data;

        //定义一些变量
        var  dataBlob = {},
           sectionIDs = [],
            rowIDs = [],
            carS = [];

        //遍历
        for (var i = 0; i <  jsonData.length; i++){
            //1.把组号放入section
            sectionIDs.push(i);
            //2.把组中的内容放入dataBlob对象中
            dataBlob[i] = jsonData[i].title;

            //3.取出该组中所以的车
            carS = jsonData[i].cars;
            rowIDs[i]= [];
            //4.遍历所有的车数组
            for (var j  = 0; j < carS.length; j++ ){
                //把行号放入rewIDs
            rowIDs[i].push(j);
                //把每一行中的内容放入到dataBlob对象中
                dataBlob[i + ':' + j] = carS[j];

            }


        }
        this.setState({

            dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)

        });

    },
    render(){
        return(
            <View  style={demo3Style.outerViewStyle}>
                <View style={demo3Style.headerView}>
                    <Text style={{color:'white', fontSize:25}}>seeMyGo品牌</Text>
                </View>

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
            >


            </ListView>
            </View>
        );
    },

    //每一组的数据
    renderSectionHeader(senctionData,senctionId){
        return(
            <View style={demo3Style.sectionHeadViewStyle}>
                <Text style={{marginLeft:10,color:'red',}}>
                    {senctionData}
                </Text>
            </View>
        );
    },
    //每一行的数据
    renderRow(data){
     return(
         <TouchableOpacity activeOpacity={0.5}>
             <View style={demo3Style.rowStyle}>

                 <Image  source={{uri:data.icon}} style={ demo3Style.rowImageStyle}/>
                 <Text style={{
                     marginLeft:15}}>{data.name}</Text>
             </View>
         </TouchableOpacity>
     );
    },



});
 const demo3Style = StyleSheet.create({

     outerViewStyle:{
       flex:1,
         marginTop:20,

     },
     rowImageStyle:{
         width:70,
         height:70,

     },
     headerView:{
       height:64,
      backgroundColor:'red',
         justifyContent:'center',
         alignItems:'center',

     },
     sectionHeadViewStyle:{
         backgroundColor:'green',
         height:25,
        justifyContent: 'center'

},

     rowStyle:{

    flexDirection:'row',

     }

 });

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo2);
