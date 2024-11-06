import ChangeNewPasswordScreen from '../screen/changenewpassword/ChangeNewPasswordScreen';
import ChangePasswordScreen from '../screen/changepassword/ChangePasswordScreen';
import ForgotPasswordScreen from '../screen/forgotpassword/ForgotPasswordScreen';
import HomeScreen from '../screen/homescreen/HomeScreen';
import OtpScreen from '../screen/otp/OtpScreen';
import PostDetailScreen from '../screen/postdetail/PostDetailScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import NewPostScreen from '../screen/newpost/NewPostScreen';
import BottomTab from '../navigations/BottomTab';
import NotificationScreen from '../screen/notification/NotificationScreen';
import ChatScreen from '../screen/chatscreen/ChatScreen';
import SearchSceen from '../screen/search/SearchSceen';
import RegisterScreen from '../screen/register/RegisterScreen';
import SettingScreen from '../screen/setting/SettingScreen';
import NotificationSettingScreen from '../screen/notificationsetting/NotificationSettingScreen';
import LanguageSettingScreen from '../screen/languagesettingscreen/LanguageSettingScreen';
import PolicyPrivacyScreen from '../screen/privacypolicy/PolicyPrivacyScreen';
import FlingScreen from '../screen/flingscreen/FlingScreen';
import CreateGroupChatScreen from '../screen/creategroupchat/CreateGroupChatScreen';
import MessageScreen from '../screen/chatscreen/MessageScreen';
import AccountDetailScreen from '../screen/accountdetail/AccountDetailScreen';
import CameraScreen from '../screen/chatscreen/CameraScreen';
import ReportScreen from '../screen/report/ReportScreen';
import PrivacySettingScreen from '../screen/privacysetting/PrivacySettingScreen';

import ChatSearch from '../screen/chatscreen/ChatSearch';
import CreateGroup from '../screen/chatscreen/CreateGroup';
import {name} from '@stream-io/video-react-native-sdk';
import Call from '../screen/callscreen/Call';

export const stackName = {
  login: {name: 'login', component: LoginScreen},
  register: {name: 'register', component: RegisterScreen},
  profile: {name: 'profile', component: ProfileScreen},
  postDetail: {name: 'postDetail', component: PostDetailScreen},
  accountDetail: {name: 'accountDetail', component: AccountDetailScreen},
  changePassword: {name: 'changePassword', component: ChangePasswordScreen},
  changeNewPassword: {
    name: 'changeNewPassword',
    component: ChangeNewPasswordScreen,
  },
  forgotPassword: {name: 'forgotPassword', component: ForgotPasswordScreen},
  otp: {name: 'otp', component: OtpScreen},
  newPost: {name: 'newPost', component: NewPostScreen},
  bottomTab: {name: 'bottomTab', component: BottomTab},
  search: {name: 'search', component: SearchSceen},
  privacySetting: {name: 'privacySetting', component: PrivacySettingScreen},
  notificationSetting: {
    name: 'notificationSetting',
    component: NotificationSettingScreen,
  },
  languageSetting: {
    name: 'languageSetting',
    component: LanguageSettingScreen,
  },
  privacyPolicy: {
    name: 'privacyPolicy',
    component: PolicyPrivacyScreen,
  },
  following: {
    name: 'following',
    component: FlingScreen,
  },
  createGroupChat: {
    name: 'createGroupChat',
    component: CreateGroupChatScreen,
  },
  conversation: {
    name: 'conversation',
    component: MessageScreen,
  },
  camera: {
    name: 'camera',
    component: CameraScreen,
  },
  report: {
    name: 'report',
    component: ReportScreen,
  },
  chatSearch: {
    name: 'chat_search',
    component: ChatSearch,
  },
  createGroup: {
    name: 'create_group',
    component: CreateGroup,
  },
  call: {
    name: 'call',
    component: Call,
  },
};

export const tabName = {
  home: {name: 'navigation.home', component: HomeScreen},
  chat: {name: 'navigation.chat', component: ChatScreen},
  notification: {
    name: 'navigation.notification',
    component: NotificationScreen,
  },
  setting: {name: 'navigation.setting', component: SettingScreen},
};
