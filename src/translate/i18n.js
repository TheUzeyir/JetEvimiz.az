import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "az",
    resources: {
      az: {
        translation: {
            //header start
          category: "Kategoriya",
          favorite: "Sevimliler",
          support: "Dəstək",
          login: "Daxil ol",
          chooseCity: "Şəhər seçin",
          newAnnouncement: "Yeni Elan",
          filter: "Filter",
          searchInput: "Əşya və ya xidmət axtarışı",
          searchInputResult: "Axtarış nəticəsi yoxdur",
          modalResult: "Bu kateqoriyanın alt kateqoriyası yoxdur.",
          modalText: "Alt kateqoriyaları görmək üçün kateqoriya seçin",
          vipAnnoucment: "VIP ELANLAR",
          allVipAnnoucment: "Butun VIP elanlar",
          myAnnoucment: "Mənim elanlarım",          
          myAccountUpper: "Şəxsi hesabı artır",  
          mySelected: "Seçilmiş olanlar",  
          logOut: "Çıxış",  
          //header Finish

          //footerRes start
          footerResNavMain:"Ana Sehife",
          footerResNavCategory:"Kateqoriyalar",
          footerResNavLiked:"Bəyəndiklərim",
          footerResNavLogin:"Giriş",
          //footerRes finish

          //footer stat
            footerMainText:"Multi-də biz müştərilərimizə bazarda ən yüksək keyfiyyətli məhsul və xidmətlər təqdim etməyə çalışırıq. Məhsullarımızın davamlı olduğunu və xidmətlərimizin gözləntiləri üstələdiyini bilməklə fəxr edirik",
            footerMission:"Bizim missiyamız",
            footeraboutText:"Bu, nümayiş mağazasıdır. Heç bir sifariş yerinə yetirilməyəcək.",
            footerStoreText:"Mağaza",
            footerproductNoteBook:"Noutbuk",
            footerproductHeadset:"Qulaqlıq",
            footerproductAcsesories:"Aksesuarlar ",
            footerproductInfoText:" Məlumat",
            footerSearchText:" Axtar",
            footerContackText:" Əlaqə",
            footerNewsText:"Xəbər məktubu ",
            footerJoinText:"Bülletenimizə qoşulun və ən son tendensiyaları və promosyonları heç vaxt qaçırmayın.",
            footerAboutNav:" Haqqımızda",
            footerCompPartText:" Kompüter hissələri",
            //footer finish

            //aboutPage start
            faqQuestion1:"Elanı necə silim ?",
            faqAnswer1:"Bunun üçün silmək istədiyiniz elanı tapın. Elanı tapmağın ən asan yolu elan kodunu axtarış xanası ilə axtarmaqdır. Elanı tapdıqdan sonra elanı sil düyməsinə tıklayın.",
            faqQuestion2:"Niyə elanım silindi ?",
            faqQuestion2:"Elan yerləşdirilən zaman qaydalar yazılıb, onları mütləq oxuyun. Yazılan qaydalardan hır hansı 1-i pozulsa sizin elan silinəcək.",
            faqQuestion3:"Elandakı məlumatları necə dəyişim ?",
            faqQuestion3:"Bunun üçün dəyişmək istədiyiniz elanı tapın. Elanı tapmağın ən asan yolu elan kodunu axtarış xanası ilə axtarmaqdır. Elanı tapdıqdan sonra 'Düzəliş et' düyməsinə tıklayın. Elanı öz hesabınıza daxil olmaqla dəyişə bilərsiniz.",
            aboutInfoText:"Haqqımızda",
            aboutRulesText:"Qaydalar",
            aboutTremConText:"İstifadəçi razılaşması",
            aboutFaqText:"Faq",
            aboutContackText:"Bizimlə əlaqə",
            contackSupportText:"Dəstək",
            contackemailText:"Elektron-poçt:",
            infoInfoText:"Layihə haqqında",
            infoRuleText1:"JetEvimiz.az lahiyəsi Azərbaycanda satış və icarə üçün nəzərdə tutulmuş ümumi icarə platformasidir.",   
            infoRuleText2:" Hər bir istifadəçi JetEvimiz.az saytindan istifadə etməklə 25 dən artiq kateqoriya üzrə məhsullari icariyə gotürə və axdara bilər",   
            infoRuleText3:"JetEvimiz.az-da şirkətlər və fərdi sahibkarlarla yanaşi fərdi şəxslərdə öz məhsullarini yerləşdirə bilərlər.",   
            infoRuleText4:"Hər hansi bir mövzuda irad və təklifiniz olarsa bu nömrələr ilə 051-588-89-68 əlaqə saxliya bilərsiniz.",   
            infoRuleText5:"Administrasiya ",   
            infoRuleText6:"Servisin inzibatçılığını Azərbaycan Respublikasının qanunvericiliyinə uyğun olaraq yaradılmış və qeydiyyatdan keçmiş “JetEvimiz MMC” Şirkəti  həyata keçirir. Servisə dair bütün mülkiyyət hüquqları müstəsna olaraq Şirkətə aiddir.",   
            rulePageRuleText1:"EasySaleApp QAYDALAR",   
            rulePageRuleText2:"Elanin yerlesidirlmesi",   
            rulePageRuleText3:"Bir ay(30gün) ərzində isdifadəçi saytin qaydalarina zidd olmayan katiqoriya və subkatiqoriyaya aid ödənişiz şəkildə yalniz bir əded elan paylaşa bilər.",   
            rulePageRuleText4:"Əger elanin müddəti bitibsə isdifadəçi elani bərpa edə bilər şəxsi kabinetinə daxil olaraq və ya yeni elanla əvəz edə billər.",   
            rulePageRuleText5:"Elan yerləşdirildikdə elan saytin qaydalarina tam olaraq uyuğun olmalidi.",   
            rulePageRuleText6:"Elan yerləşdirdikdən sonra adminstrasiya tərefindən yoxlanilir və qayda pozuntusu aşkar edilməse təsdiqlənir.",   
            rulePageRuleText7:"Aliş və satiş tipli elanlarin sayta yerləşdirilməsi qadağandir.",   
            rulePageRuleText8:"Isdifadəçi sayta yerləşdiridiyi hər bir elana görə şəxsən məsuliyyət daşiyir.",   
            rulePageRuleText9:"QAYDALARIN POZULMASI HALINDA HƏDDA ÖDƏNIŞIN HƏYATA KEÇIRILMIŞ ELANLARDA ADMINSTRASIYA TƏRƏFINDƏN SILINƏ BILƏR.",   
            rulePageRuleText10:"TƏSVIR",   
            rulePageRuleText11:"Elanin təsviri tam olaraq elanin şəklinə və təklif olunan məhsulun təsvirinə tam uyğun olmalidir",   
            rulePageRuleText12:"Bir elanda yalniz bir məhsul qeyd olunmalidir.",   
            rulePageRuleText13:"Əgər isdifadəci bir necə məhsul təklif edirsə hərbir məhsul ücün yeni elan yaradilmalidir.",   
            rulePageRuleText14:"Elanin təsvirində məshul haqqinda dəqiq və ətrafli məlumat qeyd olunmalidir.",   
            rulePageRuleText15:"Elanin təsvirində link əlavə etmək qadağandir.",   
            rulePageRuleText16:"QIYMƏT",   
            rulePageRuleText17:"Elani yerləşdirdikdə məhsulun qiymətini müvaffiq xanada qeyd edin",   
            rulePageRuleText18:"Məhsulun qiymətini şərti olaraq görsətmək qadağandi əks halda elaniniz adminstrasiya tərəfindən silinə bilər",   
            rulePageRuleText19:"ŞƏKILLƏR",   
            rulePageRuleText20:"Şəkillər keyfiyyətli olmalidir",   
            rulePageRuleText21:"Şəkillərin maksimal sayi 20-dir, minimum 1 şəkil olmalidir.",   
            rulePageRuleText22:"Şəkil elanina məzmununa uyğun olamlidir.",   
            rulePageRuleText23:"Şəkildə yalniz təklif olunnan məhsul gösdərilməlidir.",   
            rulePageRuleText24:"Qaydalara uyğun olmayan şəkillerin yerləşdirilməsi qadağandir.",   
            rulePageRuleText25:"ƏLAQƏ",   
            rulePageRuleText26:"Əlaqə vasitəlerinizi yalniz müvafiq xanada qeyd edin",   
            rulePageRuleText27:"Əlaqə vasitələrizin doğruluğuna diqqət yetirin(mobil nömrə,ad,elektron poct,ünvan)",   
            rulePageRuleText28:"Əlaqə vasitələrinizin işlək vəziyətdə olmasina diqqət yetirin,əks halda Pin kodu əlde etmək mümkün olmayacaq",   
            rulePageRuleText29:"JetEvimiz saytinin rəhbərliyi tərəfindən xəbərdarliq etmədən,birtərəfli qaydada istənilən vaxt qaydalari dəyişə bilər.",   
            termTextHead:"İSTİFADƏÇİ RAZILAŞMASI", 
            //aboutPage finish

            //login and signIn start
            loginPageLoginText:"Daxil ol",
            loginPageEmainInput:"Istifadəci Email",
            loginPagePassInput:"Şifrə",
            loginPageNotAccText:"Hesabınız yoxdur?",
            loginPageCteateAccText:"Hesab yaradın",
            signInRegstrationText:"Qeydiyyatdan keçin",
            signInNameInput:"İstifadəçi adı",
            signInFirstNameInput:"Ad",
            signInLastNameInput:"Soy Ad",
            signInPhoneInput:"Telefon",
            signInEmailInput:"E-mail",
            signInPassInput:"Şifrə",
            signInConfitmPassInput:"Şifrəni təsdiqləyin",
            signInRulesText:"Mən məxfilik siyasətinin şərtlərini qəbul edirəm",
            signInCreateAcc:"Hesab yaradın",
            signInHaveAcc:"Artıq hesabınız var?",
            signInLoginText:"Daxil ol",
            signInFinishRegstration:"Qeydiyyati Tamamlayin",
            //login and signIn finish

            //newProdutAddPage
            addProductPageNewAcc:"Yeni elan",
            addProductPageProductName:"Məhsul adı",
            addProductPageCategeryText:"Kateqoriya",
            addProductPageChooseCategery:"Kateqoriya seçin",
            addProductPageLoading:"Yüklənir...",
            addProductPageOptionLoading:"Parametrlər yüklənir...",
            addProductPageOptionLoadingNotFoud:"Bu kateqoriya üçün parametr yoxdur.",
            addProductPageChooseText:"Seçin",
            addProductPageAddImgText:"Şəkil əlavə et",
            addProductPageProductDescribe:"Məhsulun təsviri",
            addProductPageProductAddText:"Əlavə et",
            //newProductAddFinish

            //likedPageStart
            likedPageStoreText:"Magaza",
            likedPageNotProduct:"Beyenilmis mehsul yoxdur",
            //likedPageFinish

            //categoryBox start
            categoryBoxHeadText:"Kateqoriyalar",
            //categoryBox finish

            //NawBarResponsive start
            NawBarResponsiveLiked:"Beyendiklerim",
            NawBarResponsivePacked:"Paketler",
            NawBarResponsiveLang:"Dil",
            NawBarResponsiveInfo:"Hakkimizda",
            NawBarResponsiveContack:"Bizimle Elaqe",
            NawBarResponsiveRules:"Qaydalar",
            NawBarResponsiveTermCond:"Istifadeki Razilasmasi",
            NawBarResponsiveFaq:"Faq",
            //NawBarResponsive finish

            //ProfileCard start
            profileCardCurrenrtText: "Hazırda saytda",
            profileCardExpiredText: "Müddəti başa çatmış",
            profileCardNotUnpublishedText: "Dərc olunmamış",
            profileCardWaitText: "Gözləmədə",
            profileCardPersonalaccount: "Şəxsi kabinet",
            profileCardPersonalCalculation: "Şəxsi kabinet",
            profileCardUpMoney: "Pul Yüklə",
            profileCardNotHaveProduct: "Hazırda saytda elan yoxdur",
            profileCardExpiredProduct: "Müddəti başa çatmış elan yoxdur",
            profileCardNotUnpublishedProduct: "Dərc olunmamış elan yoxdur",
            profileCardWaitProduct: "Gözləmədə elan yoxdur",
            profileCardAddNew: "Yeni Elan",
            //ProfileCard finish
        },
      },
      en: {
        translation: {
            //header start
          category: "Category",
          favorite: "Favorite",
          support: "Support",
          login: "Login",
          chooseCity: "Choose City",
          newAnnouncement: "New Announcement",
          filter: "Filter",
          searchInput: "Search for an item or service",
          searchInputResult: "No search results",
          modalResult: "This category has no subcategories.",
          modalText: "Select a category to see subcategories",
          vipAnnoucment: "VIP ANNOUNCEMENTS",
          allVipAnnoucment: "All VIP ANNOUNCEMENTS",
          myAnnoucment: "My ads",
          myAccountUpper: "Personal account increases",  
          mySelected: "Selected ", 
          logOut: "Log Out", 
          //header Finish

          //footerRes start
          footerResNavMain:"Home Page",
          footerResNavCategory:"Categories",
          footerResNavLiked:"My Favorites",
          footerResNavLogin:"Login",
          //footerRes finish

          //footer stat
          footerMainText:"We strive to provide our customers with the highest quality products and services on the market. We take pride in knowing that our products are durable and our services exceed expectations",
          footerMission:"Our mission",
          footeraboutText:"His is a demonstration store. No orders will be fulfilled",
          footerStoreText:"Store",
          footerproductNoteBook:"Laptop",
          footerproductHeadset:"Dizüstü bilgisayar",
          footerproductAcsesories:" Accessories",
          footerproductInfoText:" Information",
          footerSearchText:" Search",
          footerContackText:" Contact",
          footerNewsText:" Newsletter",
          footerJoinText:" Join our newsletter and never miss the latest trends and promotions.",
          footerAboutNav:" About",
          footerCompPartText:" Computer parts",
          //footer finish

            //aboutPage start
            faqQuestion1: "How do I delete an ad?",
            faqAnswer1: "To do this, find the ad you want to delete. The easiest way to find the ad is to search for the ad code in the search box. Once you find the ad, click the 'Delete Ad' button.",
            faqQuestion2: "Why was my ad deleted?",
            faqAnswer2: "When placing an ad, rules are provided that you must read. If any of the rules are violated, your ad will be deleted.",
            faqQuestion3: "How do I edit information in the ad?",
            faqAnswer3: "To do this, find the ad you want to edit. The easiest way to find the ad is to search for the ad code in the search box. Once you find the ad, click the 'Edit' button. You can modify the ad by logging into your account.",
            aboutInfoText: "About Us",
            aboutRulesText: "Rules",
            aboutTremConText: "User Agreement",
            aboutFaqText: "FAQ",
            aboutContackText: "Contact Us",
            contackSupportText: " Support",
            contackemailText: "Email:",
            infoInfoText: "About the project",
            infoRuleText1: "The JetEvimiz.az project is a general rental platform for sale and rental in Azerbaijan.",
            infoRuleText2: "Each user can rent and search for products in more than 25 categories using the JetEvimiz.az website.",
            infoRuleText3: "Companies and individual entrepreneurs, as well as individuals, can place their products on JetEvimiz.az.",
            infoRuleText4: "If you have any comments or suggestions on any topic, you can contact these numbers: 051-588-89-68.",
            infoRuleText5: "Administration",
            infoRuleText6: "The service is administered by “JetEvimiz LLC”, a company established and registered in accordance with the legislation of the Republic of Azerbaijan. All property rights to the service belong exclusively to the Company.",
            rulePageRuleText1: "EasySaleApp RULES",
            rulePageRuleText2: "Posting an Ad",
            rulePageRuleText3: "Within a month (30 days), users can post only one free ad in categories or subcategories that comply with the site's rules.",
            rulePageRuleText4: "If the ad's duration expires, the user can restore the ad by accessing their personal account or replace it with a new ad.",
            rulePageRuleText5: "Ads posted must fully comply with the site's rules.",
            rulePageRuleText6: "After an ad is posted, it is reviewed by the administration and approved if no rule violations are found.",
            rulePageRuleText7: "Posting ads related to buying and selling is prohibited.",
            rulePageRuleText8: "Users are personally responsible for every ad they post on the site.",
            rulePageRuleText9: "IN CASE OF VIOLATION OF RULES, EVEN PAID ADS MAY BE REMOVED BY THE ADMINISTRATION.",
            rulePageRuleText10: "DESCRIPTION",
            rulePageRuleText11: "The description of the ad must match the image and the product being offered.",
            rulePageRuleText12: "Only one product should be mentioned in one ad.",
            rulePageRuleText13: "If a user offers multiple products, a new ad must be created for each product.",
            rulePageRuleText14: "The description of the ad must contain accurate and detailed information about the product.",
            rulePageRuleText15: "Adding links to the description is prohibited.",
            rulePageRuleText16: "PRICE",
            rulePageRuleText17: "Enter the product price in the relevant field when posting the ad.",
            rulePageRuleText18: "Indicating the product price as conditional is prohibited; otherwise, your ad may be removed by the administration.",
            rulePageRuleText19: "IMAGES",
            rulePageRuleText20: "Images must be of good quality.",
            rulePageRuleText21: "The maximum number of images is 20, and a minimum of 1 image is required.",
            rulePageRuleText22: "The image must correspond to the content of the ad.",
            rulePageRuleText23: "Only the offered product should be shown in the image.",
            rulePageRuleText24: "Posting images that do not comply with the rules is prohibited.",
            rulePageRuleText25: "CONTACT",
            rulePageRuleText26: "Provide your contact information only in the relevant field.",
            rulePageRuleText27: "Ensure the accuracy of your contact information (mobile number, name, email, address).",
            rulePageRuleText28: "Ensure that your contact information is active; otherwise, obtaining the PIN code will not be possible.",
            rulePageRuleText29: "The administration of the JetEvimiz website may unilaterally change the rules at any time without prior notice.",
            termTextHead: "USER AGREEMENT",
            //aboutPage finish

            //login and signIn start
            loginPageLoginText:"Log In",
            loginPageEmainInput:"Enter e-main",
            loginPagePassInput:"password",
            loginPageNotAccText:"Don't have an account?",
            loginPageCteateAccText:"Create an account",
            signInRegstrationText:"Register",
            signInNameInput:"Username",
            signInFirstNameInput:"First name",
            signInLastNameInput:"Last name",
            signInPhoneInput:"Phone",
            signInEmailInput:"E-mail",
            signInPassInput:"Password",
            signInConfitmPassInput:"Confirm Password",
            signInRulesText:"I accept the terms of the privacy policy",
            signInCreateAcc:"Create an account",
            signInHaveAcc:"Already have an account?",
            signInFinishRegstration:"Submit",
            //login and signIn finish

            //newProdutAddPage
            addProductPageNewAcc:"New Ad",
            addProductPageProductName:"Product Name",
            addProductPageCategeryText:"Category",
            addProductPageChooseCategery:"Choose category",
            addProductPageLoading:"Loading...",
            addProductPageOptionLoading:"Loading Options...",
            addProductPageOptionLoadingNotFoud:"There are no options for this category.",
            addProductPageChooseText:"Choose",
            addProductPageAddImgText:"Add Image",
            addProductPageProductDescribe:"Product Description",
            addProductPageProductAddText:"Add",
            //newProductAddFinish   
            
            //likedPageStart
            likedPageStoreText:"Store",
            likedPageNotProduct:"No favorite products",
            //likedPageFinish       
            
            //categoryBox start
            categoryBoxHeadText: "Categories",
            //categoryBox finish

            //NawBarResponsive start
            NawBarResponsiveLiked: "Liked Items",
            NawBarResponsivePacked: "Packages",
            NawBarResponsiveLang: "Language",
            NawBarResponsiveInfo: "About Us",
            NawBarResponsiveContack: "Contact Us",
            NawBarResponsiveRules: "Rules",
            NawBarResponsiveTermCond: "Terms of Use",
            NawBarResponsiveFaq: "FAQ",
            //NawBarResponsive finish

            //ProfileCard start
            profileCardCurrenrtText: "Currently on the site",
            profileCardExpiredText: "Expired",
            profileCardNotUnpublishedText: "Unpublished",
            profileCardWaitText: "Waiting",
            profileCardPersonalaccount: "Personal Account",
            profileCardPersonalCalculation: "Personal Account",
            profileCardUpMoney: "Add Money",
            profileCardNotHaveProduct: "Currently, no listings on the site",
            profileCardExpiredProduct: "No expired listings",
            profileCardNotUnpublishedProduct: "No unpublished listings",
            profileCardWaitProduct: "No waiting listings",
            profileCardAddNew: "New Listing"  
            //ProfileCard finish
        },
      },
      tr: {
        translation: {
            //header start
          category: "Kategori",
          favorite: "Sevimliler",
          support: "Support",
          chooseCity: "Şehir Seçin",
          login: "Giriş yap",
          newAnnouncement: "Yeni Ilan",
          filter: "Filtre",
          searchInput: "Mal veya hizmet arayın",
          searchInputResult: "Arama sonucu yok",
          modalResult: "Bu kategorinin alt kategorisi yoktur.",
          modalText: "Alt kategorileri görmek için bir kategori seçin",
          vipAnnoucment: "VIP Ilanlar",
          allVipAnnoucment: "Tüm VIP ilanlarim",
          myAnnoucment: "Ilanlarim",
          myAccountUpper: "Kişisel hesap artışları",  
          mySelected: "Seçilmiş olanlar",  
          logOut: "çıkış",  
          //header Finish

          //footerRes start
          footerResNavMain:"Ana Sayfa",
          footerResNavCategory:"Kategoriler",
          footerResNavLiked:"Beğendiklerim",
          footerResNavLogin:"Giriş",
          //footerRes finish

          //footer stat
          footerMainText:"Müşterilerimize piyasadaki en kaliteli ürün ve hizmetleri sunmaya çalışıyoruz. Ürünlerimizin uzun ömürlü olduğunu ve hizmetlerimizin beklentileri aştığını bilmekten gurur duyuyoruz.",
          footerMission:"Misyonumuz",
          footeraboutText:"Burası bir vitrin mağazası. Hiçbir emir yerine getirilmeyecek.",
          footerStoreText:"Mağaza",
          footerproductNoteBook:"Dizüstü bilgisayar",
          footerproductHeadset:" Kulaklık",
          footerproductAcsesories:" Aksesuarlar",
          footerproductInfoText:" Bilgi",
          footerSearchText:" Ara",
          footerContackText:" iletişim",
          footerNewsText:" Bülten",
          footerJoinText:" Bültenimize katılın ve en son trendleri ve promosyonları asla kaçırmayın.",
          footerAboutNav:" Hakkımızda",
          footerCompPartText:"Bilgisayar parçaları ",
          //footer finish

            //aboutPage start
            faqQuestion1: "İlanı nasıl silerim?",
            faqAnswer1: "Bunun için silmek istediğiniz ilanı bulun. İlanı bulmanın en kolay yolu ilan kodunu arama kutusunda aramaktır. İlanı bulduktan sonra 'İlanı Sil' butonuna tıklayın.",
            faqQuestion2: "Neden ilanım silindi?",
            faqAnswer2: "İlan yayınlanırken kurallar belirtilmiştir, bunları mutlaka okuyun. Kurallardan herhangi biri ihlal edilirse ilanınız silinecektir.",
            faqQuestion3: "İlandaki bilgileri nasıl değiştiririm?",
            faqAnswer3: "Bunun için değiştirmek istediğiniz ilanı bulun. İlanı bulmanın en kolay yolu ilan kodunu arama kutusunda aramaktır. İlanı bulduktan sonra 'Düzenle' butonuna tıklayın. İlanı kendi hesabınıza giriş yaparak değiştirebilirsiniz.",
            aboutInfoText: "Hakkımızda",
            aboutRulesText: "Kurallar",
            aboutTremConText: "Kullanıcı Sözleşmesi",
            aboutFaqText: "FAQ",
            aboutContackText: "Bize Ulaşın",
            contackSupportText: "Destek",
            contackemailText: "E-posta:",
            infoInfoText: "Proje hakkında",
            infoRuleText1: "JetEvimiz.az projesi, Azerbaycan'da satış ve kiralama için genel bir kiralama platformudur.",
            infoRuleText2: "Her kullanıcı, JetEvimiz.az web sitesini kullanarak 25'ten fazla kategoriye ait ürünleri kiralayabilir ve arayabilir.",
            infoRuleText3: "JetEvimiz.az üzerinde şirketler ve bireysel girişimcilerin yanı sıra bireyler de ürünlerini yerleştirebilir.",
            infoRuleText4: "Herhangi bir konuda yorumlarınız veya önerileriniz varsa, 051-588-89-68 numaralarından iletişime geçebilirsiniz.",
            infoRuleText5: "Yönetim",
            infoRuleText6: "Hizmet, Azerbaycan Cumhuriyeti mevzuatına uygun olarak kurulmuş ve tescil edilmiş olan “JetEvimiz LLC” tarafından yönetilmektedir. Hizmete dair tüm mülkiyet hakları yalnızca Şirkete aittir.",
            rulePageRuleText1: "EasySaleApp KURALLAR",
            rulePageRuleText2: "İlan Yayınlama",
            rulePageRuleText3: "Bir ay (30 gün) içinde kullanıcı, sitenin kurallarına aykırı olmayan kategori ve alt kategorilere yalnızca bir ücretsiz ilan paylaşabilir.",
            rulePageRuleText4: "Eğer ilanın süresi dolmuşsa kullanıcı, ilanı kişisel hesabına girerek yeniden yayınlayabilir veya yeni bir ilanla değiştirebilir.",
            rulePageRuleText5: "Yayınlanan ilan, sitenin kurallarına tam olarak uygun olmalıdır.",
            rulePageRuleText6: "İlan yayınlandıktan sonra yönetim tarafından kontrol edilir ve kural ihlali bulunmazsa onaylanır.",
            rulePageRuleText7: "Alım ve satım türündeki ilanların siteye eklenmesi yasaktır.",
            rulePageRuleText8: "Kullanıcı, siteye eklediği her ilan için şahsen sorumludur.",
            rulePageRuleText9: "KURALLARIN İHLALİ DURUMUNDA, ÖDEMESİ YAPILMIŞ OLSA BİLE İLANLAR YÖNETİM TARAFINDAN SİLİNEBİLİR.",
            rulePageRuleText10: "AÇIKLAMA",
            rulePageRuleText11: "İlan açıklaması, ilanın görseli ve teklif edilen ürünün açıklamasıyla tam uyumlu olmalıdır.",
            rulePageRuleText12: "Bir ilanda yalnızca bir ürün belirtilmelidir.",
            rulePageRuleText13: "Kullanıcı birden fazla ürün sunuyorsa her bir ürün için yeni bir ilan oluşturulmalıdır.",
            rulePageRuleText14: "İlan açıklamasında ürün hakkında net ve ayrıntılı bilgi verilmelidir.",
            rulePageRuleText15: "Açıklamaya link eklemek yasaktır.",
            rulePageRuleText16: "FİYAT",
            rulePageRuleText17: "İlanı yayınlarken ürün fiyatını ilgili alanda belirtin.",
            rulePageRuleText18: "Ürün fiyatını şartlı olarak belirtmek yasaktır; aksi takdirde ilanınız yönetim tarafından silinebilir.",
            rulePageRuleText19: "GÖRSELLER",
            rulePageRuleText20: "Görseller kaliteli olmalıdır.",
            rulePageRuleText21: "Görsellerin maksimum sayısı 20, minimum sayısı ise 1 olmalıdır.",
            rulePageRuleText22: "Görseller, ilanın içeriğine uygun olmalıdır.",
            rulePageRuleText23: "Görsellerde yalnızca teklif edilen ürün gösterilmelidir.",
            rulePageRuleText24: "Kurallara uymayan görsellerin eklenmesi yasaktır.",
            rulePageRuleText25: "İLETİŞİM",
            rulePageRuleText26: "İletişim bilgilerinizi yalnızca ilgili alanda belirtin.",
            rulePageRuleText27: "İletişim bilgilerinizin doğruluğuna dikkat edin (telefon numarası, isim, e-posta, adres).",
            rulePageRuleText28: "İletişim bilgilerinizin aktif durumda olmasına dikkat edin; aksi takdirde PIN kodunu almanız mümkün olmayacaktır.",
            rulePageRuleText29: "JetEvimiz web sitesi yönetimi, herhangi bir bildirimde bulunmadan, tek taraflı olarak istediği zaman kuralları değiştirebilir.",
            termTextHead: "KULLANICI SÖZLEŞMESİ",
            //aboutPage finish

            //login and signIn start
            loginPageLoginText:"Giriş",
            loginPageEmainInput:"Kullanıcı e-posta adresi",
            loginPagePassInput:"Şifre",
            loginPageNotAccText:"Hesabınız yok mu?",
            loginPageCteateAccText:"Hesap oluştur",
            signInRegstrationText:"Kayıt ol",
            signInNameInput:"Kullanıcı adi",
            signInFirstNameInput:"Ad",
            signInLastNameInput:"Soyadı",
            signInPhoneInput:"Telefon",
            signInEmailInput:"E-posta adresi",
            signInPassInput:"Şifre",
            signInConfitmPassInput:"Şifreyi onayla",
            signInRulesText:"Gizlilik politikasının şartlarını kabul ediyorum",
            signInCreateAcc:"Bir hesap oluştur",
            signInHaveAcc:"Zaten hesabınız var mı?",
            signInFinishRegstration:"Gönder",
            //login and signIn finish
    
            //newProdutAddPage
            addProductPageNewAcc:"Yeni Reklam",
            addProductPageProductName:"Ürün Adı",
            addProductPageCategeryText:"Kategori",
            addProductPageChooseCategery:"Kategori seçin",
            addProductPageLoading:"Yükleniyor...",
            addProductPageOptionLoading:"Parametreler Yükleniyor...",
            addProductPageOptionLoadingNotFoud:"Bu kategori için seçenek yok.",
            addProductPageChooseText:"Seç",
            addProductPageAddImgText:"Resim ekle",
            addProductPageProductDescribe:"Ürün Açıklaması",
            addProductPageProductAddText:"Ekle",
            //newProductAddFinish   
            
            //likedPageStart
            likedPageStoreText:"Magaza",
            likedPageNotProduct:"Favori ürün yok",
            //likedPageFinish

            //categoryBox start
            categoryBoxHeadText: "Kateqoriyalar",
            //categoryBox finish

            //NawBarResponsive start
            NawBarResponsiveLiked: "Beyendiklerim",
            NawBarResponsivePacked: "Paketler",
            NawBarResponsiveLang: "Dil",
            NawBarResponsiveInfo: "Hakkımızda",
            NawBarResponsiveContack: "Bizimle İletişime Geçin",
            NawBarResponsiveRules: "Kurallar",
            NawBarResponsiveTermCond: "Kullanım Şartları",
            NawBarResponsiveFaq: "SSS",
            //NawBarResponsive finish

            //ProfileCard start
            profileCardCurrenrtText: "Şu anda sitede",
            profileCardExpiredText: "Süresi dolmuş",
            profileCardNotUnpublishedText: "Yayınlanmamış",
            profileCardWaitText: "Beklemede",
            profileCardPersonalaccount: "Kişisel hesap",
            profileCardPersonalCalculation: "Kişisel hesap",
            profileCardUpMoney: "Para Yükle",
            profileCardNotHaveProduct: "Şu anda sitede ilan yok",
            profileCardExpiredProduct: "Süresi dolmuş ilan yok",
            profileCardNotUnpublishedProduct: "Yayınlanmamış ilan yok",
            profileCardWaitProduct: "Beklemede ilan yok",
            profileCardAddNew: "Yeni İlan"
            //ProfileCard finish
        },
      },
      ru: {
        translation: {
            //header start
          category: "Категори",
          favorite: "любимый",
          support: "Поддерживать",
          chooseCity: "Выберите город",
          login: "Авторизоваться",
          newAnnouncement: "Новое объявление",
          filter: "Фильтр",
          searchInput: "Поиск товаров или услуг",
          searchInputResult: "Нет результатов поиска",
          modalResult: "В этой категории нет подкатегорий.",
          modalText: "Выберите категорию, чтобы увидеть подкатегории",
          vipAnnoucment: "VIP ОБЪЯВЛЕНИЯ",
          allVipAnnoucment: "Все VIP объявления",
          myAnnoucment: "Мои объявления",
          myAccountUpper: "Увеличение личного счета ", 
          mySelected: "Избранные",  
          logOut: "выйти из системы",  
          //header Finish

          //footerRes start
          footerResNavMain:"Главная страница",
          footerResNavCategory:"Категории",
          footerResNavLiked:"Mои лайки",
          footerResNavLogin:"Авторизоваться",
          //footerRes finish

          //footer stat
          footerMainText:"Мы стремимся предоставить нашим клиентам полноценные продукты и услуги на рынке. Мы ценим, что наша продукция долговечна, а наши услуги превосходят ожидания.",
          footerMission:"Наша миссия",
          footeraboutText:"Это магазин-витрина. Никакие заказы выполняться не будут",
          footerStoreText:"Магазин",
          footerproductNoteBook:"Ноутбук",
          footerproductHeadset:" Наушники",
          footerproductAcsesories:" Аксессуары",
          footerproductInfoText:" Информация",
          footerSearchText:" Поиск",
          footerContackText:" связь",
          footerNewsText:" Информационный бюллетень",
          footerJoinText:" Подпишитесь на нашу рассылку и никогда не пропустите последние тенденции и акции",
          footerAboutNav:" О нас",
          footerCompPartText:" Детали компьютера-",
          //footer finish

            //aboutPage start
            faqQuestion1: "Как удалить объявление?",
            faqAnswer1: "Для этого найдите объявление, которое хотите удалить. Самый простой способ найти объявление — это поиск по коду объявления в поисковой строке. После того как найдете объявление, нажмите на кнопку 'Удалить объявление'.",
            faqQuestion2: "Почему мое объявление было удалено?",
            faqAnswer2: "При размещении объявления существуют правила, которые необходимо обязательно прочитать. Если хотя бы одно из правил нарушено, ваше объявление будет удалено.",
            faqQuestion3: "Как изменить информацию в объявлении?",
            faqAnswer3: "Для этого найдите объявление, которое хотите изменить. Самый простой способ найти объявление — это поиск по коду объявления в поисковой строке. После того как найдете объявление, нажмите кнопку 'Редактировать'. Вы можете изменить объявление, войдя в свой личный кабинет.",
            aboutInfoText: "О нас",
            aboutRulesText: "Правила",
            aboutTremConText: "Пользовательское соглашение",
            aboutFaqText: "Часто задаваемые вопросы",
            aboutContackText: "Свяжитесь с нами",
            contackSupportText: "Поддерживать",
            contackemailText: "Электронная почта:",
            infoInfoText: "О проекте",
            infoRuleText1: "Проект JetEvimiz.az — это общая платформа аренды для продажи и аренды в Азербайджане.",
            infoRuleText2: "Каждый пользователь может арендовать и искать товары в более чем 25 категориях, используя сайт JetEvimiz.az.",
            infoRuleText3: "На JetEvimiz.az свои товары могут размещать компании, индивидуальные предприниматели, а также частные лица.",
            infoRuleText4: "Если у вас есть замечания или предложения по любому вопросу, вы можете связаться по этим номерам: 051-588-89-68.",
            infoRuleText5: "Администрация",
            infoRuleText6: "Сервис управляется компанией «JetEvimiz LLC», созданной и зарегистрированной в соответствии с законодательством Азербайджанской Республики. Все имущественные права на сервис принадлежат исключительно Компании.",
            rulePageRuleText1: "ПРАВИЛА EasySaleApp",
            rulePageRuleText2: "Размещение объявления",
            rulePageRuleText3: "В течение одного месяца (30 дней) пользователь может бесплатно разместить только одно объявление в категории или подкатегории, не противоречащей правилам сайта.",
            rulePageRuleText4: "Если срок действия объявления истек, пользователь может восстановить его, войдя в личный кабинет, или заменить новым объявлением.",
            rulePageRuleText5: "Размещенное объявление должно полностью соответствовать правилам сайта.",
            rulePageRuleText6: "После размещения объявление проверяется администрацией и в случае отсутствия нарушений правил подтверждается.",
            rulePageRuleText7: "Запрещено размещать на сайте объявления о купле-продаже.",
            rulePageRuleText8: "Пользователь несет личную ответственность за каждое размещенное на сайте объявление.",
            rulePageRuleText9: "В СЛУЧАЕ НАРУШЕНИЯ ПРАВИЛ, ОБЪЯВЛЕНИЯ МОГУТ БЫТЬ УДАЛЕНЫ АДМИНИСТРАЦИЕЙ, ДАЖЕ ЕСЛИ ЗА НИХ БЫЛА ПРОИЗВЕДЕНА ОПЛАТА.",
            rulePageRuleText10: "ОПИСАНИЕ",
            rulePageRuleText11: "Описание объявления должно полностью соответствовать изображению и описанию предлагаемого товара.",
            rulePageRuleText12: "В одном объявлении должен быть указан только один товар.",
            rulePageRuleText13: "Если пользователь предлагает несколько товаров, для каждого товара должно быть создано отдельное объявление.",
            rulePageRuleText14: "В описании объявления должна быть указана точная и подробная информация о товаре.",
            rulePageRuleText15: "Добавление ссылок в описание запрещено.",
            rulePageRuleText16: "ЦЕНА",
            rulePageRuleText17: "При размещении объявления укажите цену товара в соответствующем поле.",
            rulePageRuleText18: "Запрещено указывать цену условно; в противном случае ваше объявление может быть удалено администрацией.",
            rulePageRuleText19: "ИЗОБРАЖЕНИЯ",
            rulePageRuleText20: "Изображения должны быть качественными.",
            rulePageRuleText21: "Максимальное количество изображений — 20, минимальное — 1.",
            rulePageRuleText22: "Изображения должны соответствовать содержанию объявления.",
            rulePageRuleText23: "На изображении должен быть изображен только предлагаемый товар.",
            rulePageRuleText24: "Запрещено размещать изображения, не соответствующие правилам.",
            rulePageRuleText25: "КОНТАКТЫ",
            rulePageRuleText26: "Указывайте контактную информацию только в соответствующем поле.",
            rulePageRuleText27: "Убедитесь в правильности контактной информации (мобильный номер, имя, электронная почта, адрес).",
            rulePageRuleText28: "Убедитесь, что ваши контактные данные активны; в противном случае получение PIN-кода будет невозможно.",
            rulePageRuleText29: "Руководство сайта JetEvimiz оставляет за собой право изменять правила в одностороннем порядке без уведомления в любое время.",
            termTextHead: "ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ",
            //aboutPage finish

            //login and signIn start
            loginPageLoginText:"Вход",
            loginPageEmainInput:"Адрес электронной почты",
            loginPagePassInput:"Пароль",
            loginPageNotAccText:"Нет учетной записи?",
            loginPageCteateAccText:"Создать учетную запись",
            signInRegstrationText:"Зарегистрироваться",
            signInNameInput:"Имя",
            signInFirstNameInput:"Имя",
            signInLastNameInput:"Фамилия",
            signInPhoneInput:"Телефон",
            signInEmailInput:"Адрес электронной почты",
            signInPassInput:"Подтвердите",
            signInConfitmPassInput:"Подтвердите пароль",
            signInRulesText:"Я принимаю условия политики конфиденциальности",
            signInCreateAcc:"Уже есть аккаунт?",
            signInHaveAcc:"Войти",
            signInFinishRegstration:"Отправить",
            //login and signIn finish

            //newProdutAddPage
            addProductPageNewAcc:"Новая реклама",
            addProductPageProductName:"Название продукта",
            addProductPageCategeryText:"Категория",
            addProductPageChooseCategery:"Выбрать категорию",
            addProductPageLoading:"Загрузка...",
            addProductPageOptionLoading:"Параметры загрузки...",
            addProductPageOptionLoadingNotFoud:"Для этой категории нет параметров.",
            addProductPageChooseText:"Выбрать",
            addProductPageAddImgText:"Добавить изображение",
            addProductPageProductDescribe:"Описание продукта",
            addProductPageProductAddText:"Добавить",
            //newProductAddFinish           
            
            //likedPageStart
            likedPageStoreText:"Магаза",
            likedPageNotProduct:"Нет любимого продукта",
            //likedPageFinish

            //categoryBox start
            categoryBoxHeadText: "Категории",
            //categoryBox finish
                    
            //NawBarResponsive start
            NawBarResponsiveLiked: "Понравившиеся товары",
            NawBarResponsivePacked: "Пакеты",
            NawBarResponsiveLang: "Язык",
            NawBarResponsiveInfo: "О нас",
            NawBarResponsiveContack: "Свяжитесь с нами",
            NawBarResponsiveRules: "Правила",
            NawBarResponsiveTermCond: "Условия использования",
            NawBarResponsiveFaq: "Часто задаваемые вопросы",
            //NawBarResponsive finish

            //ProfileCard start
            profileCardCurrenrtText: "В настоящее время на сайте",
            profileCardExpiredText: "Просрочено",
            profileCardNotUnpublishedText: "Неопубликовано",
            profileCardWaitText: "Ожидание",
            profileCardPersonalaccount: "Личный кабинет",
            profileCardPersonalCalculation: "Личный кабинет",
            profileCardUpMoney: "Пополнить деньги",
            profileCardNotHaveProduct: "В настоящее время нет объявлений на сайте",
            profileCardExpiredProduct: "Нет просроченных объявлений",
            profileCardNotUnpublishedProduct: "Нет неопубликованных объявлений",
            profileCardWaitProduct: "Нет объявлений в ожидании",
            profileCardAddNew: "Новое объявление"
            //ProfileCard finish
        
        },
      },
    },
  });

export default i18n;
