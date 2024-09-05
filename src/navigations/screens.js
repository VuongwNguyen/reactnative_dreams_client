import AccountDetailScreen from '../screen/accountdetail/AccountDetailScreen';
import ChangeNewPasswordScreen from '../screen/changenewpassword/ChangeNewPasswordScreen';
import ChangePasswordScreen from '../screen/changepassword/ChangePasswordScreen';
import ForgotPasswordScreen from '../screen/forgotpasswordscreen/ForgotPasswordScreen';
import HomeScreen from '../screen/homescreen/HomeScreen';
import OtpScreen from '../screen/otpscreen/OtpScreen';
import PostDetailScreen from '../screen/postdetailscreen/PostDetailScreen';
import ProfileScreen from '../screen/profileScreen/ProfileScreen';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import NewPostScreen from '../screen/newpost/NewPostScreen';
import BottomTab from '../navigations/BottomTab';
import NotificationScreen from '../screen/notification/NotificationScreen';
import ChatScreen from '../screen/chatscreen/ChatScreen';
import SearchSceen from '../screen/search/SearchSceen';
import PrivacySettingScreen from '../screen/privacysetting/PrivacySettingScreen';
import EmtyScreen from './../screen/emtyScreen/EmtyScreen';
import RegisterScreen from '../screen/RegisterScreen/RegisterScreen';

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
};

export const tabName = {
  home: {name: 'navigation.home', component: HomeScreen},
  chat: {name: 'navigation.chat', component: ChatScreen},
  notification: {name: 'navigation.notification', component: NotificationScreen},
  setting: {name: 'navigation.setting', component: PrivacySettingScreen},
  add: {name: 'add', component: stackName.newPost.component},
};
