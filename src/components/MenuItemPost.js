import {Text, TouchableOpacity, View} from 'react-native';
import {menuItemPostStyle} from '../styles/components/menu/menuItemPostStyle';
import {useTranslation} from 'react-i18next';

export const MenuItemPost = props => {
  const {t} = useTranslation();
  const {handleItemMenuClick, isSelf, isShared} = props;
  const selfMenu = [
    {
      title: t('itemPost.menu.edit'),
      key: 'edit',
      isSharedPost: !!isShared ? true : false,
    },
    {title: t('itemPost.menu.privacy'), key: 'privacy'},
    {title: t('itemPost.menu.delete'), key: 'delete', isDelete: true},
  ];
  const reportMenu = {title: t('itemPost.menu.report'), key: 'report'};
  return (
    <View style={menuItemPostStyle.headerMoreContainer}>
      {isSelf ? (
        selfMenu.map((item, index) =>
          !item.isSharedPost ? (
            <TouchableOpacity
              onPress={() => handleItemMenuClick(item.key)}
              style={menuItemPostStyle.itemContainer}
              key={index}>
              <Text
                style={
                  item.isDelete
                    ? menuItemPostStyle.itemTextDelete
                    : menuItemPostStyle.itemText
                }>
                {item.title}
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          ),
        )
      ) : (
        <TouchableOpacity
          onPress={() => handleItemMenuClick(reportMenu.key)}
          style={menuItemPostStyle.itemContainer}>
          <Text style={menuItemPostStyle.itemText}>{reportMenu.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
