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
      stock: 1,
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
      stock: 1,
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
      stock: 1,
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
      stock: 10,
      description:
        "Ingredientes: almendras y coco ¡y nada más! El equilibrio perfecto entre la intensidad de la almendra tostada y el dulzor del coco. Un nuevo sabor para explotar tus papilas.",
      categoryID: 1,
      rating: 5,
      brand: 4,
    });
    p5.addCategory(1);
    var p6 = await Product.create({
      name: "Difusor: PARIS",
      price: "2100",
      newItem: true,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/0e7ac9e5-f4c3-489e-945a-e80e93570f6111-bf409684e9ea462db216254981703589-1024-1024.jpeg",
      ],
      stock: 8,
      description:
        "difusor en envase de vidrio con varillas de rattan y tapa de madera - 200 ML.",
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
      stock: 8,
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
      name: "LECHE DE ALMENDRAS SIN AZÚCAR",
      price: "305",
      newItem: false,
      image: [
        "https://cdn.shopify.com/s/files/1/0522/2724/4206/products/Leche-de-Almendras-Sin-Azucar-Cocoon-100403-V1_cf96af61-58f1-4fe2-a845-f76fc0b4387a_700x.jpg?v=1610671474",
      ],
      stock: 10,
      description:
        "Ingredientes: Agua, pasta de almendras, carbonato de calcio, sal, complejo vitamínico (Vitaminas A, D2, E, riboflavina, B12), EST: Goma xantana (INS 415), goma gellan (INS 418), aromatizante, EMU: Lecitina de girasol (INS 322).",
      categoryID: 1,
      rating: 4,
      brand: 5,
    });
    p9.addCategory(1);
    var p10 = await Product.create({
      name: "Vela blanca",
      price: "1100",
      newItem: false,
      image: [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/86afe347-a49e-46e8-bc00-93341511a9841-43f005170753f169a616154900448327-640-0.jpeg",
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/845/679/products/1f8e0580-3729-4d68-94db-1603c8a3a8fd1-ad1ac32eff9c49b0ea16154900448179-640-0.jpeg",
      ],
      stock: 8,
      description:
        "EDICIÓN LIMITADA - vela de cera de soja en vaso cilíndrico blanco, al prenderla la luz se trasluce suavemente tipo fanal. disponible en aires africanos y verbena naranja.",
      categoryID: 3,
      rating: 2,
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
      name: "Crema facial HYDRA ZEN",
      price: "3000",
      stock: 10,
      categoryID: 2,
      image: ["https://i1.perfumesclub.com/grande/114749.jpg"],
      description:
        "Gracias a una inédita tecnología, Hydra Zen Neurocalm aporta una hidratación intensa, inmediata, continua y calma las pieles sensibles. Una textura gourmand aceite en agua que se funde en contacto con la piel. Está hidratada con intensidad y calmada durante más tiempo, más suave, lisa y luminosa.",
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
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = productMockUp;
