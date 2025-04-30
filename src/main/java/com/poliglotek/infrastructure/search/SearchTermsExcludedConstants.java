package com.poliglotek.infrastructure.search;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class SearchTermsExcludedConstants {

    private SearchTermsExcludedConstants() {}

    public static final List<String> FILE_TYPES = List.of("pdf", "ps", "csv", "epub", "kml", "kmz", "gpx",
            "hwp", "xls", "xlsx", "ppt", "pptx", "doc", "docx", "odp", "ods", "odt", "rtf", "svg", "tex",
            "txt", "text", "bas", "c", "cc", "cpp", "cxx", "h", "hpp", "cs", "java", "pl", "py", "wml", "wap", "xml"
    );

    public static final Map<String, String> ECOMMERCE_TERMS = new HashMap<>();
    static {
        ECOMMERCE_TERMS.put("af", "koop, aankoop, winkel, stoor, ooreenkoms, laaste kans, uitverkoping, afslag, " +
                "promosie, aanbod, aflewering, terugsendings, mandjie, betaling");
        ECOMMERCE_TERMS.put("sq", "blej, blerje, dyqan, magazinë, marrëveshje, shansi i fundit, shitje, zbritje, " +
                "promovim, ofertë, transport, kthime, shportë, pagesë");
        ECOMMERCE_TERMS.put("am", "ግዢ, ግዛት, ሱቅ, መደብር, እንቅስቃሴ, መጨረሻ እድል, ሽያጭ, ቅናሽ, እንቅስቃሴ, ቅርብ እንቅስቃሴ, መልስ, " +
                "መልስቶች, መርገጫ, ክፍያ");
        ECOMMERCE_TERMS.put("ar", "شراء, شراء, متجر, متجر, صفقة, الفرصة الأخيرة, تخفيضات, خصم, ترويج, عرض, شحن, إرجاع, سلة," +
                " دفع");
        ECOMMERCE_TERMS.put("hy", "գնել, գնում, խանութ, պահեստ, գործարք, վերջին հնարավորություն, վաճառք, զեղչ, " +
                "արշավ, առաջարկ, առաքում, վերադարձ, զամբյուղ, վճարում");
        ECOMMERCE_TERMS.put("as", "কিনা, ক্ৰয়, দোকান, চোৱাচিত্ৰ, চুক্তি, শেষ সুযোগ, বিক্ৰী, ৰেহাই, প্ৰচাৰ, অফাৰ, চেলানি, " +
                "পেঁচালি, মাচান, মূল্যভৰ্তি");
        ECOMMERCE_TERMS.put("ay", "alisa, alita, tienda, almákën, oferta, quqicha, ichiniqa, ñayratiña, " +
                "phunchalasiña, ukuña, jach'a, paynaq, payasa, wakismaña");
        ECOMMERCE_TERMS.put("az", "almaq, alış, mağaza, anbarda, sövdələşmə, son şans, satış, endirim, promosyon, " +
                "təklif, çatdırılma, geri qaytarma, səbət, ödəniş");
        ECOMMERCE_TERMS.put("bm", "sanan, sanan, fɔnɔ, da, forokoyi, dɔ̀gɔfɛ̀ɛra, jawula, dɔgɔkolo, nyɔn sɛbɛnni, " +
                "san, sigi, fɔlɔ, danfɛ, kawula");
        ECOMMERCE_TERMS.put("eu", "erosi, erosketa, denda, biltegia, akordioa, azken aukera, salmenta, deskontua, " +
                "promozioa, eskaintza, bidalketa, itzulketa, saski, ordainketa");
        ECOMMERCE_TERMS.put("be", "купля, купля, крама, склад, здзелка, апошні шанец, распродаж, скідка, " +
                "прасоўванне, прапанова, дастаўка, вяртанне, кошык, аплата");
        ECOMMERCE_TERMS.put("bn", "কেনা, কেনাকাটা, দোকান, দোকানঘর, চুক্তি, শেষ সুযোগ, বিক্রয়, ছাড়, প্রচার, প্রস্তাব, " +
                "শিপিং, রিটার্ন, ঝুড়ি, পেমেন্ট");
        ECOMMERCE_TERMS.put("bho", "खरीद, खरीदारी, दूकान, भंडार, सौदा, अंतिम मौका, बिक्री, छूट, प्रचार, पेशकश, शिपिंग, " +
                "वापसी, टोकरी, भुगतान");
        ECOMMERCE_TERMS.put("bs", "kupiti, kupovina, trgovina, skladište, dogovor, posljednja prilika, rasprodaja, " +
                "popust, promocija, ponuda, dostava, povrat, korpa, uplata");
        ECOMMERCE_TERMS.put("bg", "купя, покупка, магазин, склад, сделка, последен шанс, разпродажба, отстъпка, " +
                "промоция, оферта, доставка, връщане, кошница, плащане");
        ECOMMERCE_TERMS.put("ca", "comprar, compra, botiga, magatzem, acord, última oportunitat, venda, descompte, " +
                "promoció, oferta, enviament, devolucions, cistella, pagament");
        ECOMMERCE_TERMS.put("ceb", "paliton, pamalit, tindahan, tindahanan, kasabot, katapusan nga higayon, halin, " +
                "diskwento, promosyon, tanyag, pagpapadala, pagbalik, basket, bayad");
        ECOMMERCE_TERMS.put("zh-cn", "购买, 购买, 商店, 仓库, 交易, 最后机会, 销售, 折扣, 促销, 提供, 运输, 退货, 篮子, 付款");
        ECOMMERCE_TERMS.put("zh-tw", "購買, 購買, 商店, 倉庫, 交易, 最後機會, 銷售, 折扣, 促銷, 提供, 運輸, 退貨, 籃子, 付款");
        ECOMMERCE_TERMS.put("co", "cumprà, compra, magazinu, magazinu, affare, ultima chance, vendita, scontu, " +
                "prumuzione, offerta, spedizione, ritorni, canestro, pagamentu");
        ECOMMERCE_TERMS.put("hr", "kupiti, kupovina, dućan, skladište, dogovor, zadnja prilika, rasprodaja, popust, " +
                "promocija, ponuda, dostava, povrat, košara, plaćanje");
        ECOMMERCE_TERMS.put("cs", "koupit, koupě, obchod, sklad, dohoda, poslední šance, prodej, sleva, propagace, " +
                "nabídka, doprava, vrácení, košík, platba");
        ECOMMERCE_TERMS.put("da", "købe, køb, butik, lager, aftale, sidste chance, salg, rabat, kampagne, tilbud, " +
                "forsendelse, returnering, kurv, betaling");
        ECOMMERCE_TERMS.put("dv", "ކޯބި, ކޯބި, ބައި, ބާބައި, ކުދިޔު, ނީގެ ތަފައްކައް, ހިސާތަކާ, ކްގެއްބައި, ދަދަލިއި, " +
                "އަވަނިން, ކަލް, ބަސްކައި");
        ECOMMERCE_TERMS.put("en", "buy, purchase, shop, store, deal, last chance, sale, discount, promo, offer, " +
                "shipping, returns, cart, basket, payment");
        ECOMMERCE_TERMS.put("et", "osta, ost, pood, ladu, tehing, viimane võimalus, müük, allahindlus, reklaam, " +
                "pakkumine, saatmine, tagastused, korv, makse");
        ECOMMERCE_TERMS.put("ee", "naɖu, naɖu, azɔ, nɔva, fifia, nudahã, da, egɔmegbegble, doxɔme, nɔviwo, dziɖo, " +
                "afisania, kɔka, kpɔsi");
        ECOMMERCE_TERMS.put("fil", "bumili, pagbili, tindahan, imbakan, kasunduan, huling pagkakataon, pagbebenta, " +
                "diskwento, promosyon, alok, pagpapadala, pagbabalik, basket, bayad");
        ECOMMERCE_TERMS.put("fi", "bumili, pagbili, tindahan, imbakan, kasunduan, huling pagkakataon, pagbebenta, " +
                "diskwento, promosyon, alok, pagpapadala, pagbabalik, basket, bayad");
        ECOMMERCE_TERMS.put("fr", "acheter, achat, magasin, entrepôt, accord, dernière chance, vente, réduction, " +
                "promotion, offre, expédition, retours, panier, paiement");
        ECOMMERCE_TERMS.put("fy", "keapje, oankeap, winkel, opslach, deal, lêste kâns, ferkeap, koarting, promoasje, " +
                "oanbod, ferstjoeren, retours, koer, betelling");
        ECOMMERCE_TERMS.put("gl", "mercar, compra, tenda, almacén, acordo, última oportunidade, venda, desconto, " +
                "promoción, oferta, envío, devolucións, cesta, pago");
        ECOMMERCE_TERMS.put("ka", "ყიდვა, შესყიდვა, მაღაზია, საწყობი, გარიგება, ბოლო შანსი, გაყიდვა, " +
                "ფასდაკლება, აქცია, შეთავაზება, მიტანა, დაბრუნება, კალათა, გადახდა");
        ECOMMERCE_TERMS.put("de", "kaufen, kauf, laden, lager, abkommen, letzte chance, verkauf, rabatt, werbung, " +
                "angebot, versand, rücksendungen, korb, zahlung");
        ECOMMERCE_TERMS.put("el", "αγορά, αγορά, κατάστημα, αποθήκη, συμφωνία, τελευταία ευκαιρία, πώληση, έκπτωση, " +
                "προώθηση, προσφορά, αποστολή, επιστροφές, καλάθι, πληρωμή");
        ECOMMERCE_TERMS.put("gn", "jey, ñepyrũ, karaiha, ojepytara, apohyi, ára paha, mbohekovia, ñemopotĩ, ombose, " +
                "ñe’ẽnguero, ambue, amo’ẽ, toguei, pavỹ");
        ECOMMERCE_TERMS.put("gu", "ખરીદ, ખરીદી, દુકાન, સ્ટોર, સોદો, છેલ્લી તક, વેચાણ, ડિસ્કાઉન્ટ, પ્રમોશન, ઓફર, શિપિંગ, " +
                "પરત, ટોકરી, ચુકવણી");
        ECOMMERCE_TERMS.put("ht", "achte, achte, magazen, depo, kontra, dènye chans, lavant, rabè, pwomosyon, òf, " +
                "anbakman, retounen, panyen, peman");
        ECOMMERCE_TERMS.put("ha", "saya, saya, shago, ma’ajin kaya, yarjejeniyar, damar ƙarshe, siyarwa, ragi, " +
                "talla, bayarwa, jigila, dawowa, kwando, biya");
        ECOMMERCE_TERMS.put("haw", "kūʻai, kūʻai, hale kūʻai, hale waihona, ʻae, manawa hope, kūʻai ʻia, hoʻēmi, " +
                "hoʻolaha, hāʻawi, hoʻouna, hoʻihoʻi, hīnaʻi, uku");
        ECOMMERCE_TERMS.put("he", "לקנות, קנייה, חנות" +
                ", מחסן, עסקה, הזדמנות אחרונה, מכירה, הנחה, קידום, הצעה, משלוח, החזרות, סל, תשלום");
        ECOMMERCE_TERMS.put("hi", "खरीद, खरीदारी, दुकान, भंडार, सौदा, आखिरी मौका, बिक्री, छूट, प्रचार, पेशकश, शिपिंग, " +
                "रिटर्न, टोकरी, भुगतान");
        ECOMMERCE_TERMS.put("hmn", "yuav, yuav khoom, khw muag khoom, cia, deal, sij hawm kawg, muag, luv nqi, " +
                "txhawb nqa, kev pabcuam, xa khoom, xa rov qab, lub pob tawb, nyiaj");
        ECOMMERCE_TERMS.put("hu", "vásárlás, vásárlás, bolt, raktár, üzlet, utolsó esély, értékesítés, kedvezmény, " +
                "promóció, ajánlat, szállítás, visszaküldések, kosár, fizetés");
        ECOMMERCE_TERMS.put("is", "kaupa, kaup, búð, geymsla, samningur, síðasta tækifæri, sala, afsláttur, kynning, " +
                "tilboð, sending, skil, körfu, greiðsla");
        ECOMMERCE_TERMS.put("ig", "zụta, zụta, ụlọ ahịa, ụlọ nkwakọba, nkwekọrịta, ohere ikpeazụ, ire, ọla dị ala, " +
                "mkpọsa, onyinye, mbupu, nkwụghachi, bọket, ịkwụ ụgwọ");
        ECOMMERCE_TERMS.put("ilo", "gatang, gatang, talipapa, tabiat, tulin, sakbay, gataan, tapan, patak, " +
                "pauknangan, taro, sakbayen, kalupi, kaba");
        ECOMMERCE_TERMS.put("id", "beli, pembelian, toko, gudang, kesepakatan, kesempatan terakhir, penjualan, " +
                "diskon, promosi, penawaran, pengiriman, pengembalian, keranjang, pembayaran");
        ECOMMERCE_TERMS.put("ga", "ceannach, ceannach, siopa, stóras, margadh, an deis dheireanach, díolachán, " +
                "lascaine, cur chun cinn, tairiscint, loingsiú, fillteanna, cliabh,íocaíocht");
        ECOMMERCE_TERMS.put("it", "comprare, acquisto, negozio, magazzino, affare, ultima occasione, vendita, " +
                "sconto, promozione, offerta, spedizione, resi, cesta, pagamento");
        ECOMMERCE_TERMS.put("ja", "購入, 購入, 店舗, 倉庫, 取引, 最後のチャンス, 販売, 割引, プロモーション, オファー, " +
                "配送, 返品, かご, 支払い");
        ECOMMERCE_TERMS.put("jv", "tuku, tuku, toko, gudang, persetujuan, kesempatan pungkasan, adol, diskon, " +
                "promosi, tawaran, kiriman, bali, kranjang, pambayaran");
        ECOMMERCE_TERMS.put("kn", "ಖರೀದಿ, ಖರೀದಿ, ಅಂಗಡಿ, ಮಳಿಗೆ, ಒಪ್ಪಂದ, ಕೊನೆ ಅವಕಾಶ, ಮಾರಾಟ, ರಿಯಾಯಿತಿ, ಪ್ರಚಾರ, ಒಫರ್, ಸಾಗಣೆ, " +
                "ಮರಳಿಕೆಗಳು, ಟೋಕರಿ, ಪಾವತಿ");
        ECOMMERCE_TERMS.put("kk", "сатып алу, сатып алу, дүкен, қойма, мәміле, соңғы мүмкіндік, сату, жеңілдік, " +
                "насихаттау, ұсыныс, жөнелту, қайтару, себет, төлем");
        ECOMMERCE_TERMS.put("km", "ទិញ, ទិញ, ហាង, ឃ្លាំង, កិច្ចព្រមព្រៀង, ឱកាសចុងក្រោយ, លក់, បញ្ចុះតម្លៃ, ការផ្សព្វផ្សាយ, ការផ្ដល់ជូន, " +
                "ការដឹកជញ្ជូន, ត្រលប់វិញ, កន្ត្រក, ការទូទាត់");
        ECOMMERCE_TERMS.put("rw", "kugura, kugura, iduka, ububiko, amasezerano, amahirwe ya nyuma, kugurisha, " +
                "kugabanya, kumenyekanisha, itangwa, kohereza, gusubira, inkangara, kwishyura");
        ECOMMERCE_TERMS.put("gom", "खरेदी, खरेदी, दुकान, गोदाम, सौदा, शेवटचा चान्स, विक्री, सूट, प्रमोशन, ऑफर, शिपिंग, परत," +
                " बास्केट, पेमेंट");
        ECOMMERCE_TERMS.put("ko", "구매, 구매, 상점, 저장소, 거래, 마지막 기회, 판매, 할인, 프로모션, 제안, 배송, 반품, 장바구니, " +
                "결제");
        ECOMMERCE_TERMS.put("kri", "buy, store, deal, last chansu, sale, discount, promotion, offa, shipping, " +
                "return, basket, payment");
        ECOMMERCE_TERMS.put("ku", "kirîn, kirîn, firoke, magaza, peyman, careya paşîn, firotin, têgitandin, " +
                "pêşvebirin, pêşkêş, barkirin, veger, kanistra, dayîn");
        ECOMMERCE_TERMS.put("ckb", "خرید, خرید, فرۆشگا," +
                " خزینە, داوا، داوای کوردینەوە, دەگمار, فرۆشتن, داشكۆبەندا, تەقووتن, ناردن, خزمەت, ڕگەڕاندن, ئارابەتى");
        ECOMMERCE_TERMS.put("ky", "сатып алуу, сатып алуу, дүкөн, кампуста, келишим, акыркы мүмкүнчүлүк, сатуу, " +
                "арзандатуу, жарнама, сунуш, жеткирүү, кайтаруу, себет, төлөм");
        ECOMMERCE_TERMS.put("lo", "ຊື້, ຊື້, ຮ້ານຄ້າ, ໂຮງພັກ, ຂໍ້ຕົກລົງ, ໂອກາດສຸດທ້າຍ, ຂາຍ, ສ່ວນຫຼຸດ, ການໂຄສະນາ, ຂໍ້ສະເຫນີ," +
                " ການສົ່ງ, ການກັບ, ກະຕ່າ, ການຈ່າຍ");
        ECOMMERCE_TERMS.put("lv", "pirkt, iegādāties, veikals, noliktava, darījums, pēdējā iespēja, izpārdošana, " +
                "atlaide, veicināšana, piedāvājums, piegāde, atgriešana, grozs, maksājums");
        ECOMMERCE_TERMS.put("lt", "pirkti, pirkti, parduotuvė, sandėlis, sandoris, paskutinė galimybė, " +
                "išpardavimas, nuolaida, skatinimas, pasiūlymas, pristatymas, grąžinimas, krepšelis, mokėjimas");
        ECOMMERCE_TERMS.put("lg", "okugula, okugula, dduuka, omukutu, endagaano, omukisa ogusembayo, okutunda, " +
                "ekisale, ekigattiriza, ekiteeso, okutwala, okudda, ekibbo, okusasula");
        ECOMMERCE_TERMS.put("lb", "kafen, Akaf, Buttek, Lager, Deal, lescht Chance, Verkaaf, Remise, Promotioun, " +
                "Offer, Versand, Retouren, Kuerf, Bezuelung");
        ECOMMERCE_TERMS.put("mk", "купување, купување, продавница, магацин, договор, последна шанса, продажба, " +
                "попуст, промоција, понуда, испорака, враќање, кошница, плаќање");
        ECOMMERCE_TERMS.put("mai", "किनैक, किनैक, दुकान, भंडार, सौदा, अंतिम मौका, बिक्री, छूट, प्रचार, प्रस्ताव, शिपिंग, " +
                "वापसी, टोकरी, भुगतान");
        ECOMMERCE_TERMS.put("mg", "mividy, mividy, fivarotana, trano fitahirizana, fifanarahana, fotoana farany, " +
                "fivarotana, fihenam-bidy, fampiroboroboana, tolotra, fandefasana, famerenana, harona, fandoavam-bola");
        ECOMMERCE_TERMS.put("ms", "beli, pembelian, kedai, gudang, perjanjian, peluang terakhir, jualan, diskaun, " +
                "promosi, tawaran, penghantaran, pulangan, bakul, pembayaran");
        ECOMMERCE_TERMS.put("ml", "വാങ്ങുക, വാങ്ങൽ, കട, ഗൊഡൗൺ, കരാർ, അവസാന അവസരം, വിൽപ്പന, കുറവ്, പ്രമോഷൻ, ഓഫർ, ഷിപ്പിംഗ്, " +
                "മടക്കം, ബാസ്‌ക്കറ്റ്, പേയ്മെന്റ്");
        ECOMMERCE_TERMS.put("mt", "xiri, xiri, ħanut, maħżen, ftehim, l-aħħar ċans, bejgħ, skont, promozzjoni, " +
                "offerta, tbaħħir, ritorn, basket, ħlas");
        ECOMMERCE_TERMS.put("mi", "hoko, hoko, toa, whare putunga, kirimana, tūpono whakamutunga, hoko, hekenga, " +
                "whakatairanga, tuku, kaipuke, whakahoki, kete, utu");
        ECOMMERCE_TERMS.put("mr", "खरेदी, खरेदी, दुकान, गोदाम, सौदा, शेवटचा चान्स, विक्री, सूट, प्रमोशन, ऑफर, शिपिंग, परत, टोकरी, पेमेंट");
        ECOMMERCE_TERMS.put("lus", "lei, lei, bial, i te hlom, deal, hun hlui, hla rual, discount, promotion, " +
                "huatruan, thawk, luhkhawm, basket, payment");
        ECOMMERCE_TERMS.put("mn", "худалдаж авах, худалдан авалт, дэлгүүр, агуулах, хэлэлцээр, сүүлийн боломж, " +
                "худалдаа, хөнгөлөлт, сурталчилгаа, санал, хүргэлт, буцах, сагс, төлбөр");
        ECOMMERCE_TERMS.put("my", "ဝယ်ယူ, ဝယ်ယူ, ဆိုင်, ဂိုဒေါင်, သဘောတူညီချက်, နောက်ဆုံးအခွင့်အလမ်း, အရောင်း, လျှော့စျေး, ကြော်ငြာ, " +
                "ကမ်းလှမ်းမှု, ပို့ဆောင်မှု, ပြန်လည်ပေးခြင်း, ထည့်, ငွေပေးချေမှု");
        ECOMMERCE_TERMS.put("ne", "किन्ने, खरीद, पसल, गोदाम, सम्झौता, अन्तिम मौका, बिक्री, छुट, प्रवर्धन, प्रस्ताव, ढुवानी, फिर्ता, टोकरी, भुक्तानी");
        ECOMMERCE_TERMS.put("no", "kjøpe, kjøp, butikk, lager, avtale, siste sjanse, salg, rabatt, kampanje, tilbud, " +
                "levering, returer, kurv, betaling");
        ECOMMERCE_TERMS.put("ny", "kugula, kugula, sitolo, zosungira, mgwirizano, mwayi womaliza, kugulitsa, " +
                "kuchotsera, kutsatsa, mwayi, kutumiza, kubweza, basket, malipiro");
        ECOMMERCE_TERMS.put("or", "କିଣ, କିଣ, ଦୋକାନ, ସ୍ତୋର, ବ୍ୟବସ୍ଥା, ଶେଷ ଅବସର, ବିକ୍ରୟ, ରିହାତି, ପ୍ରୋମୋଶନ୍, ପ୍ରସ୍ତାବ, ଶିପ୍ପିଙ୍ଗ, " +
                "ପ୍ରତିଯୋଗୀତା, ଟୋକରୀ, ପେମେଣ୍ଟ୍");
        ECOMMERCE_TERMS.put("om", "bitee, bitee, gabatee, cuqaa, waliin, carraa xumura, gurgurtaa, hirbaachisa, " +
                "beeksiftoota, kennaa, geejjiba, deebii, qophaa’aa, kaffaltii");
        ECOMMERCE_TERMS.put("ps", "اخیستل, اخیستل," +
                " هټۍ, ګودام, سودا, وروستی فرصت, پلور, تخفیف, پرمختګ, وړاندیز, بار وړل, راستنیدل, ټوکرۍ, تادیه");
        ECOMMERCE_TERMS.put("fa", "خرید, خرید," +
                " فروشگاه, انبار, معامله, فرصت آخر, فروش, تخفیف, ترفیع, پیشنهاد, ارسال, بازگشت, سبد, پرداخت");
        ECOMMERCE_TERMS.put("pt", "compra, comprar, loja, armazém, acordo, última chance, venda, desconto, promoção, " +
                "oferta, envio, devoluções, cesto, pagamento");
        ECOMMERCE_TERMS.put("pa", "ਖਰੀਦ, ਖਰੀਦ, ਦੂਕਾਨ, ਗੋਦਾਮ, ਸੌਦਾ, ਆਖਰੀ ਮੌਕਾ, ਵਿਕਰੀ, ਛੋਟ, ਪਰਚਾਰ, ਪੇਸ਼ਕਸ਼, ਸ਼ਿਪਿੰਗ, ਵਾਪਸੀ, ਟੋਕਰੀ, ਭੁਗਤਾਨ");
        ECOMMERCE_TERMS.put("qu", "rantiy, rantiy, wasimanta, phatucha, akupana, tukuchiykunan pacha, rantiypi, " +
                "allinta tukuspakuy, yaqay, kawsaq, apay, kutimuy, tukunaq, qullqi");
        ECOMMERCE_TERMS.put("ro", "cumpărare, cumpărare, magazin, depozit, acord, ultima șansă, vânzare, reducere, " +
                "promoție, ofertă, expediere, retururi, coș, plată");
        ECOMMERCE_TERMS.put("ru", "покупка, покупка, магазин, склад, сделка, последний шанс, продажа, скидка, " +
                "продвижение, предложение, доставка, возврат, корзина, оплата");
        ECOMMERCE_TERMS.put("sm", "faatau, faatau, faleoloa, fale teu oloa, feagaiga, avanoa mulimuli, faatau, " +
                "faaitiitiga, faalauiloaina, ofa, lafoina, toe faafoi, ato, totogi");
        ECOMMERCE_TERMS.put("sa", "क्रय, क्रय, अपण, भण्डार, संज्ञा, अन्तिम अवसर, विक्रय, छुट, प्रचार, प्रस्ताव, सन्देशन, प्रतिदान, टोकरी, भुगतान");
        ECOMMERCE_TERMS.put("ln", "kosomba, kosomba, zando, ebombelo, boyokani, esika ya suka, koteka, " +
                "likambu ya kotondisa, kobenda bato, liboso, kotindika, kozongisa, sakusi, kofuta");
        ECOMMERCE_TERMS.put("la", "emere, emere, taberna, horreum, negotium, ultima occasio, venditio, remissio, " +
                "promotio, oblatio, navis, regressus, fiscus, solutio");
        ECOMMERCE_TERMS.put("nl", "kopen, aankopen, winkel, magazijn, deal, laatste kans, verkoop, korting, " +
                "promotie, aanbieding, verzending, retouren, mandje, betaling");
        ECOMMERCE_TERMS.put("doi", "ख़रीदी, ख़रीदी, दुकान, भंडार, सौदा, आखिरी मौका, बिक्री, छूट, प्रोमोशन, ऑफर, शिपिंग, वापसी, टोकरी, पेमेंट");
        ECOMMERCE_TERMS.put("sr", "куповина, куповина, продавница, складиште, уговор, последња шанса, продаја, " +
                "попуст, промоција, понуда, достава, повратак, корпа, плаћање");
        ECOMMERCE_TERMS.put("st", "reka, reka, lebenkele, polokelo, tumellano, monyetla wa ho qetela, thekiso, " +
                "theolelo, papatso, nyehelo, thomello, khutlisetso, basket, tefo");
        ECOMMERCE_TERMS.put("sn", "kutenga, kutenga, chitoro, imba yekuchengetera, chibvumirano, " +
                "mukana wekupedzisira, kutengesa, dhisikaundi, kusimudzira, kupa, kutumira, kudzoka, basket, " +
                "kubhadhara");
        ECOMMERCE_TERMS.put("sd", "خريد, خريد," +
                " دڪان, گودام, سودا, آخري موقعو, وڪرو, رعايت, مشهوري, پيشڪش, شپنگ, واپسي, ٽوڪري, ادائيگي");
        ECOMMERCE_TERMS.put("si", "මිලදී ගැනීම, මිලදී ගැනීම, වෙළඳසැල, ගබඩාව, ගිවිසුම, අවසාන අවස්ථාව, විකිණීම, " +
                "මිල අඩු කිරීම, ප්‍රවර්ධනය, යෝජනාව, නැව්ගත කිරීම, ආපසු යැවීම, බැග්, ගෙවීම");
        ECOMMERCE_TERMS.put("sk", "nákup, nákup, obchod, sklad, dohoda, posledná šanca, predaj, zľava, propagácia, " +
                "ponuka, doprava, vrátenie, košík, platba");
        ECOMMERCE_TERMS.put("sl", "nakup, nakup, trgovina, skladišče, pogodba, zadnja priložnost, prodaja, popust, " +
                "promocija, ponudba, dostava, vračilo, košarica, plačilo");
        ECOMMERCE_TERMS.put("so", "iibso, iibso, dukaanka, bakhaarka, heshiiska, fursadda ugu dambeysa, iib, " +
                "qiimo dhimis, xayeysiis, dalab, dhoofinta, soo celinta, dambiil, lacag-bixinta");
        ECOMMERCE_TERMS.put("es", "compra, comprar, tienda, almacén, acuerdo, última oportunidad, venta, descuento, " +
                "promoción, oferta, envío, devoluciones, cesta, pago");
        ECOMMERCE_TERMS.put("su", "beuli, meuli, toko, gudang, pasatujuan, kasempetan terakhir, penjualan, diskon, " +
                "promosi, tawaran, pengiriman, balikan, keranjang, pamayaran");
        ECOMMERCE_TERMS.put("sw", "kununua, kununua, duka, ghala, makubaliano, nafasi ya mwisho, mauzo, punguzo, " +
                "matangazo, ofa, usafirishaji, kurudi, kikapu, malipo");
        ECOMMERCE_TERMS.put("sv", "köp, köpa, butik, lager, avtal, sista chansen, försäljning, rabatt, kampanj, " +
                "erbjudande, frakt, returer, korg, betalning");
        ECOMMERCE_TERMS.put("tl", "pagbili, pagbili, tindahan, bodega, kasunduan, huling tsansa, benta, diskwento, " +
                "promosyon, alok, pagpapadala, pagbabalik, basket, pagbabayad");
        ECOMMERCE_TERMS.put("tg", "харид, харид, мағоза, анбор, шартнома, шонси охирин, фурӯш, тахфиф, таблиғот, " +
                "пешниҳод, интиқол, бозгашт, сабад, пардохт");
        ECOMMERCE_TERMS.put("ta", "வாங்குதல், வாங்குதல், கடை, கிடங்கு, ஒப்பந்தம், கடைசி வாய்ப்பு, விற்பனை, தள்ளுபடி, " +
                "ஊக்குவிப்பு, சலுகை, கப்பல், திரும்ப, கூடை, பணம் செலுத்துதல்");
        ECOMMERCE_TERMS.put("tt", "сатып алу, сатып алу, кибет, склад, килешү, соңгы шанс, сату, ташлама, акция, " +
                "тәкъдим, җибәрү, кире кайтару, кәрҗин, түләү");
        ECOMMERCE_TERMS.put("te", "కొనుగోలు, కొనుగోలు, దుకాణం, గిడ్డంగి, ఒప్పందం, చివరి అవకాశం, అమ్మకం, రాయితీ, ప్రమోషన్, ఆఫర్, రవాణా, " +
                "తిరిగి, బుట్ట, చెల్లింపు");
        ECOMMERCE_TERMS.put("th", "ซื้อ, ซื้อ, ร้านค้า, คลังสินค้า, ข้อตกลง, โอกาสสุดท้าย, ขาย, ส่วนลด, โปรโมชั่น, ข้อเสนอ, การจัดส่ง, " +
                "การคืนสินค้า, ตะกร้า, การชำระเงิน");
        ECOMMERCE_TERMS.put("ti", "ግዢ, ግዢ, ሱቅ, እንደማ, ውል, አብራር አይነት, ሽያጭ, ቅናሽ, ዘማሪት, አቀማመጥ, መላክ, መመለስ, " +
                "መክን, ክፍያ");
        ECOMMERCE_TERMS.put("ts", "xava, xava, xivandla, layeni, ntwanano, nkarhi wo hetelela, bindzu, hungula, " +
                "nhundzu, nyiko, ku rhumela, vuyela, basket, hakelo");
        ECOMMERCE_TERMS.put("tr", "satın al, satın alma, mağaza, depo, anlaşma, son şans, satış, indirim, " +
                "promosyon, teklif, nakliye, iade, sepet, ödeme");
        ECOMMERCE_TERMS.put("tk", "satyn almak, satyn almak, dükän, ammar, şertnama, soňky mümkinçilik, satuw, " +
                "arzanladyş, mahabat, teklip, iberiş, yzyna gaýtarmak, sebet, töleg");
        ECOMMERCE_TERMS.put("ak", "tɔ, tɔ, duka, faakyeɛ, apam, ɔpɛ daakye, adwuma, ntama, nkɔmbɔ, " +
                "nsɛm a wɔde gu ho, ɔbra mu nhyehyɛ, san ba, akotokuo, sika");
        ECOMMERCE_TERMS.put("uk", "покупка, купівля, магазин, склад, угода, останній шанс, розпродаж, знижка, " +
                "просування, пропозиція, доставка, повернення, кошик, оплата");
        ECOMMERCE_TERMS.put("ur", "خرید, خرید," +
                " دکان, گودام, معاہدہ, آخری موقعہ, فروخت, رعایت, پروموشن, پیشکش, ترسیل, واپسی, ٹوکری, ادائیگی");
        ECOMMERCE_TERMS.put("ug", "سېتىۋېلىش, سېتىۋېلىش, دۇكان, ئامبار," +
                " كېلىشىم, ئاخىرقى پۇرسەت, سېتىش, چۈشۈرۈش, ئىلان, تەكلىپ, توشۇش, قايتۇرۇش, كارىز, پۇل تۆلەش");
        ECOMMERCE_TERMS.put("uz", "xarid, sotib olish, do'kon, ombor, shartnoma, oxirgi imkoniyat, savdo, chegirma, " +
                "reklama, taklif, yetkazib berish, qaytish, savat, to'lov");
        ECOMMERCE_TERMS.put("vi", "mua, mua, cửa hàng, kho, thỏa thuận, cơ hội cuối cùng, bán, giảm giá, khuyến mãi, " +
                "đề nghị, vận chuyển, hoàn trả, giỏ hàng, thanh toán");
        ECOMMERCE_TERMS.put("cy", "prynu, prynu, siop, warws, cytundeb, cyfle olaf, gwerthiant, gostyngiad, " +
                "hyrwyddo, cynnig, cludo, dychwelyd, basged, talu");
        ECOMMERCE_TERMS.put("xh", "thenga, thenga, ivenkile, indawo yokugcina impahla, isivumelwano, " +
                "ithuba lokugqibela, ukuthengiswa, isaphulelo, ukukhuthaza, unikezelo, ukuthunyelwa, " +
                "ukubuyisela, isitya, ukuhlawula");
        ECOMMERCE_TERMS.put("yi", "קויפן, קויפן, קראָם, ווערכאַוס, אָפּמאַך, לעצטע געלעגנהייט," +
                " פארקויפונג, אַראָפּרעכענען, העכערונג, פאָרשלאָג, שיפּינג, צוריקקומען, קאָרב, באצאָלונג");
        ECOMMERCE_TERMS.put("yo", "rà, rà, ile itaja, ile ipamọ, adehun, àyànmọ́ ìkẹ́yìn, tita, ìdinkù, ìpolówó, " +
                "ìpèsè, gbigbe, ipadà, àpò, sisan");
        ECOMMERCE_TERMS.put("zu", "ukuthenga, ukuthenga, isitolo, isitoreji, isivumelwano, ithuba lokugcina, " +
                "ukuthengisa, isaphulelo, ukukhuthaza, ukunikezwa, ukuthumela, ukubuyisa, ibhasikidi, inkokhelo");
        ECOMMERCE_TERMS.put("gd", "ceannach, ceannach, bùth, taigh-bathair, aonta, an cothrom mu dheireadh, reic, " +
                "lasachadh, sanasachd, tairgse, luingearachd, tilleadh, basgaid, pàigheadh");
        ECOMMERCE_TERMS.put("nso", "reka, reka, lebenkele, polokelo, tumellano, monyetla wa ho qetela, thekiso, " +
                "theolelo, papatso, nyehelo, thomello, khutlisetso, basket, tefo");
    }
}
