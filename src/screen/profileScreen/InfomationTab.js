import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { InfomationTabStyle } from '../../styles/profileStyle/InformationTabStyle'

const InfomationTab = () => {
  const data = [
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
    {title:'Title',content:'Content',icon:'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7'},
  ]
  const Item = (props) => {
    const {title = '', content = '', icon = '', onPress} = props
    return (
      <TouchableOpacity style={InfomationTabStyle.itemContainer} onPress={onPress}>
        <Image style={InfomationTabStyle.icon}  source={{uri:icon}}/>
        <Text style={InfomationTabStyle.title}>{title}</Text>
        <Text style={InfomationTabStyle.value}>{content}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={InfomationTabStyle.container}>
      {data.map((item, index) => (
        <Item key={index} title={item.title} content={item.content} icon={item.icon}/>
      ))}
    </View>
  )
}

export default InfomationTab