const { Product } = require("../src/db");
const productMockUp = async () => {
  try {
    var p1 = await Product.create({
      name: "Dulce de frambuesa artesanal",
      price: 300,
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/130/674/products/beepure_dulce-frambuesal-copia11-721e7340aa8dec81ac15900785230333-640-0.jpg",
      ],
      stock: 0,
      description:
        "El dulce artesanal de frambuesa BEEPURE está preparado con frambuesa orgánica de El Bolsón, Río Negro. Lo elaboramos con fruta entera, lo que permite disfrutar de la textura típica de los dulces de la Patagonia argentina. Es único para untar tostadas, rellenar panqueques y hasta para cocinar cheesecake y tartas dulces. Ingredientes: frambuesas orgánicas certificadas, azúcar rubia certificada, pectina (aglutinante natural de la fruta).",
      rating: 0,
      brand: 1,
    });
    p1.addCategory(1);
    var p2 = await Product.create({
      name: "Dulce de leche Sin Azúcar Agregada",
      price: "200",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/130/674/products/beepure-dulce-de-leche-sin-azucar1-ee43bb6b152f0ea31616052114309444-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/130/674/products/dulce-de-leche-sin-azucar-agregada-budin1-a9dd7ac8e29ef6b0b716121964536217-640-0.jpg",
      ],
      stock: 0,
      description:
        "El dulce de leche sin azúcar agregada BEEPURE se prepara con leche de tambos de Magdalena, Buenos Aires. Está endulzado con sucralosa, por lo cual es apto para diabéticos (los hidratos de carbono -azúcares- que se utilizan para espesar el producto son de bajo índice glucémico y de bajo aporte calórico).",
      categoryID: 1,
      rating: 0,
      brand: 1,
    });
    p2.addCategory(1);
    var p3 = await Product.create({
      name: "Serum Facial Ácido Hialurónico",
      price: "800",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/776/340/products/sfah11-4c29beb497dfe2d40216321606328979-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/776/340/products/sfah11-4c29beb497dfe2d40216321606328979-640-0.jpg",
      ],
      stock: 1,
      description:
        "Hidrata, regenera y tersa el tejido de la piel Concentrado de extractos vegetales y esenciales, jojoba y almendra, vitamina E, tiene la propiedad de atraer y retener moléculas de agua. Con esto, se aumenta la hidratación de las células de nuestra piel, haciéndola más tersa. Además combate la flacidez y potencia la firmeza del cutis. Esto se debe a que el ácido hialurónico facilita la síntesis de colágeno. Este compuesto posee grandes propiedades antienvejecimiento. Aporta volumen a la piel y rellena las arrugas y los signos de expresión. De esta forma la piel se mantiene joven por más tiempo. Modo de uso: Luego de la limpieza facial, aplicar una pequeña cantidad y expandir en todo el rostro y cuello con un suave masaje. Sin T.A.C.C. - No testeado en animales - Vegano - Libre de Parabenos Envase: 30 g Cosmética Sustentable",
      categoryID: 2,
      rating: 0,
      brand: 2,
    });
    p3.addCategory(2);
    var p4 = await Product.create({
      name: "Leche Estrías - Coco & Calendula",
      price: "700",
      newItem: true,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/776/340/products/coco-11-7342609717327eb20516313651755734-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/776/340/products/coco-11-7342609717327eb20516313651755734-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/776/340/products/coco-11-7342609717327eb20516313651755734-640-0.jpg",
      ],
      stock: 0,
      description:
        "Nutre y ayuda a corregir naturalmente las marcas de estrías. La planta de Caléndula contiene una sustancia altamente cicatrizante y emoliente llamada “Calendulina”, encargada de producir la epitelización, acción natural de curación dérmica. El Coco posee propiedades que promueven la regeneración y rehidratación de los tejidos ayudando y complementando las propiedades correctoras de la Caléndula. El extracto Orgánico de Oliva ayuda a suavizar y reforzar la hidratación de la piel. Modo de Uso: Aplicar sobre la piel dando masajes circulares cubriendo todas las zonas con estrías. Para optimizar los resultados realizar este procedimiento dos veces al día o más si así lo desea. Envase con 500 g Cosmética Sustentable",
      categoryID: 2,
      rating: 0,
      brand: 3,
    });
    p4.addCategory(2);
    var p5 = await Product.create({
      name: "Crema Untable De Almendras Y Coco x 170grs",
      price: "600",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/almendras-y-coco_t1-2ad1157d1cd494301f16303673741238-640-0.png",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/whatsapp-image-2021-03-24-at-16-26-071-273aa632cd1ffc30dc16166144029236-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/tabla-alm-y-coco1-905f1965ec9e1c2a3a16142697602707-640-0.png",
      ],
      stock: 0,
      description:
        "Ingredientes: almendras y coco ¡y nada más! El equilibrio perfecto entre la intensidad de la almendra tostada y el dulzor del coco. Un nuevo sabor para explotar tus papilas.",
      categoryID: 1,
      rating: 5,
      brand: 4,
    });
    p5.addCategory(1);
    var p6 = await Product.create({
      name: "DIFUSOR: AIRES AFRICANOS",
      price: "2100",
      newItem: true,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_77141-c0036d4ecfcfd29fa016254986584838-640-0.jpeg",
      ],
      stock: 8,
      description:
        "Este blend frutal y floral es vibrante. Su protagonista es el pomelo rosado, combinado con notas florales de geranios, bayas de enebro, licor de damascos y ámbar. Es un aroma único y luminoso como una mañana de verano. Nuestro favorito y a la vez nuestro best seller, ante la duda es por acá. Difusor con varillas y tapa de madera de 200 ml. No solo es hermoso sino que huele increíble, contiene la máxima concentración de esencia de todos nuestros preparados.",
      categoryID: 3,
      rating: 2,
      brand: 3,
    });
    p6.addCategory(3);
    var p7 = await Product.create({
      name: "Vela blanca",
      price: "1100",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/86afe347-a49e-46e8-bc00-93341511a9841-43f005170753f169a616154900448327-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/1f8e0580-3729-4d68-94db-1603c8a3a8fd1-ad1ac32eff9c49b0ea16154900448179-640-0.jpeg",
      ],
      stock: 0,
      description:
        "EDICIÓN LIMITADA - vela de cera de soja en vaso cilíndrico blanco, al prenderla la luz se trasluce suavemente tipo fanal. disponible en aires africanos y verbena naranja.",
      categoryID: 3,
      rating: 2,
      brand: 3,
    });
    p7.addCategory(3);
    var p8 = await Product.create({
      name: "Vela de Cerámica",
      price: "1600",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_51821-cd37438330d0a1d39316177461132538-1024-1024.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_51931-395e53603829fdb2d216177461134554-240-0.jpeg",
      ],
      stock: 18,
      description:
        "vela de cera de soja en vaso de cerámica irregular, cada una es única.",
      categoryID: 3,
      rating: 5,
      brand: 3,
    });
    p8.addCategory(3);
    var p9 = await Product.create({
      name: "LECHE DE COCO SIN AZÚCAR",
      price: "305",
      newItem: false,
      image: [
        "https://cocoonfoods.com.ar/wp-content/uploads/2020/09/galeriacoco1.png",
        "https://cocoonfoods.com.ar/wp-content/uploads/2020/10/2forumlacoco-600x600-1.png",
      ],
      stock: 23,
      description:
        "Nuestra bebida de coco es tan rica y naturalmente dulce que no necesitamos agregarle azúcar. Tiene un sabor increíble y un aroma para hacerte sentir de vacaciones en cualquier momento. Tomalá sola, ¡bien fría! o sumala en tus licuados. Ingredientes: Agua, crema de coco, carbonato de calcio, aromatizante, sal, EST: lecitina de girasol (INS 322(, EST: goma gellan (INS 418), ACI: ácido cítrico (INS 330), complejo vitamínico (vitamina A, D2, E, riboflavina y B12).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p9.addCategory(1);
    var p10 = await Product.create({
      name: "DIFUSOR: MANZANILLA, TILO & JAZMÍN",
      price: "2100",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_77081-2f75dff2b1e2f1da1816254987769123-640-0.jpeg",
      ],
      stock: 8,
      description:
        "La dulzura de la manzanilla, la sutileza del tilo y la frescura del jazmín componen este aroma que abraza. Huele al confort del hogar, a mañanas en la playa, es una bocanada de aire fresco. Difusor con varillas y tapa de madera de 200 ml. No solo es hermoso sino que huele increíble, contiene la máxima concentración de esencia de todos nuestros preparados.",
      categoryID: 3,
      rating: 1,
      brand: 3,
    });
    p10.addCategory(3);
    var p11 = await Product.create({
      name: "Crema untable de castañas de cajú x 170grs",
      price: "700",
      newItem: true,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/caju-t1-f952a0d46a5d4aac8116303671869502-640-0.png",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/whatsapp-image-2021-08-30-at-20-39-141-f937a8dd845a96ae9416303671869019-640-0.jpeg",
      ],
      stock: 10,
      description:
        "Ingredientes: castañas de cajú ¡y nada más! No importa cómo la uses, en su versión salada o dulce, va a mejorar tu plato 100%. El fruto seco más versátil convertido en crema untable.",
      categoryID: 1,
      rating: 3,
      brand: 4,
    });
    p11.addCategory(1);
    var p12 = await Product.create({
      name: "Crema untable de nueces pecan x 170grs",
      price: "600",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/nuez-pecan-t1-0fd358f41d6945c2bf16303674672088-640-0.png",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/whatsapp-image-2021-03-24-at-16-26-07-11-6386b911be4b52065416166144452137-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/571/332/products/tabla-pecan1-5f771fac3cb589cc8a16142701165220-640-0.png",
      ],
      stock: 10,
      description:
        "Ingredientes: nueces pecan ¡y nada más! La estrella de la familia por ser simple, deliciosa y la más low carb. Una crema innovadora para cualquier paladar.",
      categoryID: 1,
      rating: 2,
      brand: 4,
    });
    p12.addCategory(1);
    var p13 = await Product.create({
      name: "Esponja de Baño",
      price: "790",
      stock: 4,
      categoryID: 2,
      image: [
        "https://i1.wp.com/wholegreen.com.ar/wp-content/uploads/2020/12/CEPIvirginia800x800.png?resize=600%2C600&ssl=1",
      ],
      description:
        "Esponja corporal de mango largo, hecho de bambú y esponja de origen vegetal. Para hacerte sentir la mejor sensación mientras eliminas impurezas y células muertas de la piel. Masajea, exfolia y limpia mejorando la elasticidad y firmeza de tu piel notablemente.",
    });
    p13.addCategory(2);
    var p14 = await Product.create({
      name: "Mascara facial",
      image: [
        "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/058/870/products/bell20_1-889cc978377b138c5616027134313101-640-0.jpg",
      ],
      stock: 5,
      price: "750",
      description:
        "Desarrollada con nuestra exclusiva formula Organic active a base de aceites y mantecas orgánicas certificadas. Combina una mezcla de arcillas naturales y cascara de nuez molida que descontaminan los poros promoviendo el crecimiento y desarrollo de nuevas células, es altamente nutritiva debido a la presencia de vitaminas y antioxidantes naturales.",
    });
    p14.addCategory(2);
    var p15 = await Product.create({
      name: "Crema ultra vital veganis",
      description:
        "Con propiedades antioxidantes y vitamina E que ayudan a equilibrar todas las funciones de la piel, regulando y restaurando el equilibrio graso",
      image: [
        "https://www.farmacialeloir.com.ar/img/articulos/2021/02/veganis_detox_facial_crema_de_di_a_palta_y_oliva_thumb1.jpg",
      ],
      price: "700",
      stock: 3,
    });
    p15.addCategory(2);
    var p16 = await Product.create({
      name: "Hydra Me Corporal ",
      description:
        "Hydra Me Regeneradora esta formulada con una base de aceite de almendras puro, extracto de aloe vera y manteca de karite. Enriquecida con aceite de argan, este actúa como un potente anti-edad y regenerador.",
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/808/161/products/hydra-me-uso-diario-111-17a2fd8512e9b2b83f16262352159047-1024-1024.jpg",
      ],
      price: "400",
      stock: 10,
    });
    p16.addCategory(2);
    var p17 = await Product.create({
      name: "Muzzalmendra",
      description:
        "Queso alternativo a base de almendra Felices las vacas. El preferido por todos.INGREDIENTES Agua, almendras, aceite de coco, fécula de mandioca, arroz, levadura, especias, sal, ARO: mozzarella. CONTIENE ALMENDRAS. PUEDE CONTENER CASTAÑAS DE CAJÚ Y DERIVADOS DE SOJA",
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/ms_muzzalmendras1-660b50ef8d95f8e65116263723477242-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/img_20681-5ad03297d546ee728916263743981925-640-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/img_20641-a81569d12dd02ea9e216263743974815-480-0.jpg",
        "https://feliceslasvacas.com/wp-content/uploads/2021/07/21-04-27_Muzzalmendra_500_ORIGINAL.jpg",
      ],
      price: "498",
      stock: 21,
    });
    p17.addCategory(1);
    var p18 = await Product.create({
      name: "Queso Cremoso 500gr Felices Las Vacas",
      description:
        "Queso alternativo a base de almendra Felices las vacas. El preferido por todos.INGREDIENTES Agua, almendras, aceite de coco, fécula de mandioca, arroz, levadura, especias, sal, ARO: crema. CONTIENE ALMENDRAS. PUEDE CONTENER CASTAÑAS DE CAJÚ Y DERIVADOS DE SOJA",
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/whatsapp-image-2021-06-22-at-10-32-45-am1-4447eebda1113b8ca516243691423139-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/img_21791-795c9793626856dd2516263743691623-480-0.jpg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/img_21711-68b4ac4c7b1b82358f16263743690839-480-0.jpg",
        "https://feliceslasvacas.com/wp-content/uploads/2021/07/tabla-2.jpg",
      ],
      price: "498",
      stock: 12,
    });
    p18.addCategory(1);
    var p19 = await Product.create({
      name: "BEL LAB SKIN UP TÓNICO FACIAL BIFÁSICO LIMPIADOR X 120ML",
      description:
        "Potente tónico desarrollado para otorgarle una limpieza profunda a la piel, ideal para pieles acnéicas, con tendencia a grasa debido a su alto poder astringente. Posee propiedades desinfectantes, desinflamatorias, analgésicas y cicatrizantes.",
      image: [
        "https://www.farmacialeloir.com.ar/img/articulos/bel_lab_skin_up_tonico_facial_bifasico_limpiador_2_imagen1.jpg",
      ],
      price: "1185",
      stock: 20,
    });
    p19.addCategory(2);
    var p20 = await Product.create({
      name: "Cepillo de Dientes de Bambú Hawai – Whole Green",
      description:
        "97 % biodegradable, 3 % reciclable. Misma vida útil que los cepillos de plástico. Diseño estético con mango y cerda de color (Blanco, verde agua, celeste claro, violeta y naranja). Diferentes tipos de dureza de cerdas para que el cepillo se adapte adecuadamente a cada persona(Sueva, Medio y Duro).",
      image: [
        "https://i2.wp.com/wholegreen.com.ar/wp-content/uploads/2020/05/1200x1200_0005__DSC5653.jpg?resize=600%2C600&ssl=1",
      ],
      price: "315",
      stock: 8,
    });
    p20.addCategory(2);
    var p21 = await Product.create({
      name: "Beepure Mantequilla de Mani",
      description:
        "Mantequilla de maní 100% maní SIN AZÚCAR. Seleccionamos el mejor maní cordobés para preparar la mantequilla de maní BEEPURE. Está buenísima para untar en tostadas, para combinar con granolas, frutas y preparaciones reposteras. Certificación SIN TACC.",
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/beepure-mantequilla-de-mani-terminado1-3be2ab5336dfa8ca5815970928574162-640-0.png",
      ],
      price: "315",
      stock: 18,
    });
    p21.addCategory(1);
    var p22 = await Product.create({
      name: "LECHE DE ALMENDRAS sabor CHOCOLATE",
      price: "305",
      newItem: false,
      image: [
        "https://cocoonfoods.com.ar/wp-content/uploads/2019/06/choco.png",
        "https://cocoonfoods.com.ar/wp-content/uploads/2020/10/tchocolate-600x600-1.jpg",
      ],
      stock: 10,
      description:
        "Disfrutá del mejor sabor a chocolate intenso en nuestra chocolatada de almendras. Un sabor equilibrado y liviano para los amantes de lo dulce, y sin culpa! Ingredientes: Agua, azúcar, pasta de almendras, cacao en polvo, carbonato de calcio, sal, complejo vitamínico (Vitaminas A, D2, 3, riboflavina, B12), EST: Goma xantana (INS 415), goma gellan (INS 418), EMU: Lecitina de girasol (INS 322).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p22.addCategory(1);
    var p23 = await Product.create({
      name: "LECHE DE ALMENDRAS sabor original",
      price: "305",
      newItem: false,
      image: [
        "https://cocoonfoods.com.ar/wp-content/uploads/2019/06/originall.png",
        "https://cocoonfoods.com.ar/wp-content/uploads/2020/09/toriginal-600x600-1.jpg",
      ],
      stock: 0,
      description:
        "100% natural, de extractos vegetales, nuestra bebida Original es la alternativa saludable y liviana para agregarle a tu café o disfrutarla sola, ¡tomala bien fría! Ingredientes: Agua, pasta de almendras, azúcar, carbonato de calcio, sal, complejo vitamínico (Vitaminas A, D2, E, riboflavina, B12), EST: Goma xantana (INS 415), goma gellan (INS 418), EMU: Lecitina de girasol (INS 322).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p23.addCategory(1);
    var p24 = await Product.create({
      name: "LECHE DE ALMENDRAS SIN AZÚCAR sabor original",
      price: "305",
      newItem: false,
      image: [
        "https://cocoonfoods.com.ar/wp-content/uploads/2019/06/sinaz.png",
        "https://cocoonfoods.com.ar/wp-content/uploads/2020/10/tsinazucar-600x600-1.jpg",
      ],
      stock: 5,
      description:
        "Bebida de almendras con verdadero sabor a almendras. Sin azúcar, sin saborizantes, sin aditivos artificiales. ¡Naturalmente rica! Ingredientes: Agua, pasta de almendras, carbonato de calcio, sal, complejo vitamínico (Vitaminas A, D2, E, riboflavina, B12), EST: Goma xantana (INS 415), goma gellan (INS 418), aromatizante, EMU: Lecitina de girasol (INS 322).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p24.addCategory(1);
    var p25 = await Product.create({
      name: "LECHE DE ALMENDRAS CASTAÑAS DE CAJÚ",
      price: "305",
      newItem: false,
      image: [
        "https://cocoonfoods.com.ar/wp-content/uploads/2021/06/producto-castanas-caju.jpg",
        "https://cocoonfoods.com.ar/wp-content/uploads/2021/06/info-nutri-caju.png",
      ],
      stock: 5,
      description:
        "Nuestra bebida de castañas de cajú es tan rica y naturalmente dulce. Tomalá sola, ¡bien fría! o sumala en tus licuados. Ingredientes: Agua, pasta de castañas de cajú, carbonato de calcio, EMU: Lecitina de girasol (INS 322), sal, EST: Goma xántica (INS 415), aromatizante, EST: Goma gellan (INS 418), ACI: Ácido cítrico (INS 330), complejo vitamínico (Vitaminas A, D2, E, riboflavina y B12), EST: goma guar (INS 412).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p25.addCategory(1);
    var p26 = await Product.create({
      name: "DIFUSOR: PEONÍAS & FRESIAS",
      price: "2100",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_775711-a81026f67b15ba516816254984972759-640-0.jpeg",
      ],
      stock: 8,
      description:
        "Una combinación floral que toma toda la frescura de las fresias y la dulzura de las peonías. Huele a mañanas primaverales. Difusor con varillas y tapa de madera de 200 ml. No solo es hermoso sino que huele increíble, contiene la máxima concentración de esencia de todos nuestros preparados.",
      categoryID: 3,
      rating: 1,
      brand: 3,
    });
    p26.addCategory(3);
    var p27 = await Product.create({
      name: "HOME SPRAY: NARANJA & PIMIENTA",
      price: "2500",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_76221-2a9d8698e6c0a6f10716254974287936-640-0.jpeg",
      ],
      stock: 8,
      description:
        "Naranja y pimienta se unen en esta experiencia única. Las notas picantes y especiadas de la pimienta se tropiezan con la frescura de la naranja dando lugar a este blend increíble, lleno de personalidad. Bruma para ambientes y textiles de 500ml. Ideal para perfumar por todos lados regulando intensidad deseada.",
      categoryID: 3,
      rating: 1,
      brand: 3,
    });
    p27.addCategory(3);
    var p27 = await Product.create({
      name: "VELAS DE NOCHE",
      price: "400",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_64011-039c54c4ebd1fc6e3616338918439545-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/img_64401-379ac58b97cdca83d716338918434671-640-0.jpeg",
      ],
      stock: 8,
      description:
        "Pack de 6 velitas de noche de cera de soja (sin esencia). duran un montón encendidas y vienen en bolsita compostable.",
      categoryID: 3,
      rating: 5,
      brand: 3,
    });
    p27.addCategory(3);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = productMockUp;
