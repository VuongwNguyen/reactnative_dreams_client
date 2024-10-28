import { Text, TouchableOpacity, View } from "react-native";
import { menuItemPostStyle } from "../styles/components/menu/menuItemPostStyle";

export const MenuItemPost = (props) => {
  const {handleItemMenuClick} = props
  const titles = [
    {title:'Báo cáo',key:'report'},
    {title:'Chỉnh sửa',key:'edit'},
    {title:'Quyền riêng tư', key:'privacy'},
    {title:'Xóa bài viết', key:'delete',isDelete:true}
  ]
  return (
      <View style={menuItemPostStyle.headerMoreContainer}>
        {
          titles.map((item, index) => (
            <TouchableOpacity onPress={() => handleItemMenuClick(item.key)} style={menuItemPostStyle.itemContainer} key={index}>
              <Text style={item.isDelete ? menuItemPostStyle.itemTextDelete : menuItemPostStyle.itemText}>{item.title}</Text>
              <View style={menuItemPostStyle.line}></View>
            </TouchableOpacity>
          ))
        }
      </View>    
  )
};