import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Assets} from '../../styles';
import MessageRight from '../../components/MessageRight';
import MessageLeft from '../../components/MessageLeft';
import GridImage from '../../components/GirdImage';
import {MessageStyles} from '../../styles/messagestyle/MessageStyle';

const MessageScreen = props => {
  const {navigation} = props;
  const [message, setMessage] = useState('');
  const [yourMessage, setYourMessage] = useState({idUser: 1});
  const [messages, setMessages] = useState(DataMessage);
  const [height, setHeight] = useState(0);
  return (
    <View style={MessageStyles.container}>
      <View style={MessageStyles.headerChatContainer}>
        <View style={MessageStyles.headerChat}>
          <View style={MessageStyles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={MessageStyles.avatar}
              source={{
                uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
              }}
            />
            <View>
              <Text style={MessageStyles.textUser}>User2</Text>
              <Text style={MessageStyles.textStatusUser}>Active now</Text>
            </View>
          </View>
          <View style={MessageStyles.headerRight}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={MessageStyles.containerChat}>
        <ScrollView
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {messages.messages.map((message, index) => (
            <View key={index}>
              {message.idUser === yourMessage.idUser ? (
                <View style={MessageStyles.wraperMessage}>
                  <MessageRight>
                    {message.messageText && (
                      <Text style={MessageStyles.textMessageRight}>
                        {message.messageText}
                      </Text>
                    )}
                    {message.messageImage && (
                      <GridImage arrImages={message.messageImage} />
                    )}
                  </MessageRight>
                  <Text style={MessageStyles.textCreateAtRight}>
                    {message.createdAt}
                  </Text>
                </View>
              ) : (
                <View style={MessageStyles.wraperMessage}>
                  <MessageLeft style={MessageStyles.wraperMessage}>
                    {message.messageText && (
                      <Text style={MessageStyles.textMessageLeft}>
                        {message.messageText}
                      </Text>
                    )}
                    {message.messageImage && (
                      <GridImage arrImages={message.messageImage} />
                    )}
                  </MessageLeft>
                  <Text style={MessageStyles.textCreateAtLeft}>
                    {message.createdAt}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={MessageStyles.footerChat}>
        {message.length > 0 ? null : (
          <>
            <Pressable>
              <Ionicons name="attach" size={24} color="black" />
            </Pressable>
            <Pressable>
              <Feather name="camera" size={24} color="black" />
            </Pressable>
          </>
        )}
        <View style={MessageStyles.wraperTextInput}>
          <TextInput
            style={[
              MessageStyles.textInputMessage,
              {height: Math.max(50, height)},
            ]}
            value={message}
            placeholder=" Write your message"
            onChangeText={text => {
              setMessage(text);
            }}
            multiline={true}
            onContentSizeChange={event => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
          />
          <Pressable
            onPress={() => setMessage('')}
            style={MessageStyles.buttonSendMessage}>
            <Ionicons name="send-sharp" size={24} color="black" />
          </Pressable>
        </View>
        {message.length > 0 ? null : (
          <>
            <Pressable>
              <Image
                source={require('../../../assets/icons/keyboardvoice.png')}
              />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default MessageScreen;

const DataMessage = {
  idMessage: 1,
  messages: [
    {
      idUser: 1,
      messageText:
        'Hello, how are you? Hi! I’,m fine thank you and you Hello, how are you? Hi! I’,m fine thank you and you',
      messageImage: [],
      createdAt: '11:00 AM',
    },
    {
      idUser: 2,
      messageText: 'Hi! I’,m fine thank you and you',
      messageImage: [],
      createdAt: '11:00 AM',
    },
    {
      idUser: 2,
      messageText: 'Hi! I’,m fine thank you and you',
      messageImage: [],
      createdAt: '11:00 AM',
    },
    {
      idUser: 2,
      messageText: '',
      messageImage: [
        'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
        'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
        'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
        'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
      ],
      createdAt: '11:00 AM',
    },
    {
      idUser: 1,
      messageText: 'Hello, how are you?',
      messageImage: [],
      createdAt: '11:00 AM',
    },
    {
      idUser: 1,
      messageText: 'Hello, how are you?',
      messageImage: [],
      createdAt: '11:00 AM',
    },
  ],
};
