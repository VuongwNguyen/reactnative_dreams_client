import AccountDetailScreen from '../screen/accountdetail/AccountDetailScreen';
import ChangeNewPasswordScreen from '../screen/changenewpassword/ChangeNewPasswordScreen';
import ChangePasswordScreen from '../screen/changepassword/ChangePasswordScreen';
import ForgotPasswordScreen from '../screen/forgotpasswordscreen/ForgotPasswordScreen';
import HomeScreen from '../screen/homescreen/HomeScreen';
import OtpScreen from '../screen/otpscreen/OtpScreen';
import PostDetailScreen from '../screen/postdetailscreen/PostDetailScreen';
import ProfileScreen from '../screen/profileScreen/ProfileScreen';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen/RegisterScreen';
import NewPostScreen from '../screen/newpost/NewPostScreen';
import BottomTab from '../navigations/BottomTab';
import NotificationScreen from '../screen/notification/NotificationScreen';
export const stackName = {
  example: 'Example',
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
};

export const tabName = {
  home: {name: 'home', component: HomeScreen},
  notification: {name: 'notification', component: NotificationScreen},
  search: {name: 'search', component: HomeScreen},
  profile: {name: 'profile', component: HomeScreen},
};
