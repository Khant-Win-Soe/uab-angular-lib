Button Style နှင့် button Radius သတ်မှတ်ပေးနိုင်ရန် const ကြေငြာထားသည်များ ယူသုံးသင့်ပါသည်။

#usage
import { ButtonColorStyles, ButtonRadiusStyles } from 'my-library';

  protected buttonColor = ButtonColorStyles;
  protected buttonRadius = ButtonRadiusStyles;


  Color တွင် 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link' | 'noBackground' 

  Button တွင် icon ထည့်ချင်ပါက icon class ကို လှမ်းခေါ်၍ position absolute ဖြင့်နေရာချနိုင်ပါသည်။ 
  Button icon အား buttonIconClass input ဖြင့် class name ပေး၍လည်းအသုံးပြုနိုင်ပါသည်။