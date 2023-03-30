export const Constant = {

     Auth : {
        login: 'Login',
        signIn : 'User/Registration'
    },
     
    Url :
    {
      changePassword :'Password/ChangePassword',
      resetPassword :'Password/ResetPassword',
      sendMail :'Password/ForgetPassword',
      logout :'Login/logOut',
      googleLogin : 'Login/GoogleAuth',
      user :'User',
      fileUpload:'File/file',
      profile:'User/profile',
      update:'User',
      profileImage:'File/Profileimage'
    },
}

export const REGEX = {
  USERNAME: /[a-zA-Z0-9]{3,}/,
  EMAIL: /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/,
  PASSWORD: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
  CPF:/\d{3}\.\d{3}\.\d{3}\-\d{2}/,
  YOUTUBE_LINK:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
  PHONE:/^[6-9]\\d{9}$/,
  DOMAIN:/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
  ACCOUNT_NUMBER:/^[0-9]{9,18}$/
};

export const URL = "http://192.180.2.128:5050/api/"
export const urlImage='http://192.180.2.128:5050/Assets//Images//mankiransingh8@gmail.com 17-6 22-3-2023 xtx 4x6 jjsdjsjdsd-1.jpg'
export let text=1
export let image=2
export let filetype=3
export let urlChooseFile='assets/chooseFile.jpg'


