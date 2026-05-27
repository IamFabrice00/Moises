export type Locale = "it" | "en" | "es";

export interface TranslationDict {
  navbar: {
    steps: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
    order: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    btnCreate: string;
    btnExplore: string;
    conceptBadge: string;
    conceptTitle: string;
    conceptDesc: string;
    footer: string;
  };
  step1: {
    step: string;
    sub: string;
    title: string;
    desc: string;
    selected: string;
    btnNext: string;
  };
  step2: {
    step: string;
    sub: string;
    title: string;
    desc: string;
    dropzoneActive: string;
    dropzoneIdle: string;
    dropzoneBrowse: string;
    formats: string;
    sizeError: string;
    formatError: string;
    readError: string;
    remove: string;
    ready: string;
    btnBack: string;
    btnNext: string;
  };
  step3: {
    step: string;
    sub: string;
    title: string;
    desc: string;
    dragTipHeader: string;
    dragTipBody: string;
    presetsHeader: string;
    presetLeft: string;
    presetCenter: string;
    presetRight: string;
    sliderScale: string;
    sliderRotation: string;
    reset: string;
    btnBack: string;
    btnNext: string;
  };
  step4: {
    step: string;
    sub: string;
    title: string;
    desc: string;
    summaryHeader: string;
    fabricColor: string;
    printLogo: string;
    logoPosition: string;
    editColor: string;
    editLogo: string;
    editPosition: string;
    positionCenter: string;
    positionLeft: string;
    positionRight: string;
    positionCustom: string;
    btnBack: string;
    btnNext: string;
  };
  step5: {
    step: string;
    sub: string;
    title: string;
    desc: string;
    secContact: string;
    labelName: string;
    placeName: string;
    errName: string;
    labelEmail: string;
    placeEmail: string;
    errEmail: string;
    errEmailFormat: string;
    labelPhone: string;
    placePhone: string;
    secSizes: string;
    sizesApplied: string;
    errQuantity: string;
    errMaxQuantity: string;
    secAddress: string;
    labelStreet: string;
    placeStreet: string;
    errStreet: string;
    labelCity: string;
    placeCity: string;
    errCity: string;
    labelZip: string;
    placeZip: string;
    errZip: string;
    labelCountry: string;
    secNotes: string;
    placeNotes: string;
    btnBack: string;
    btnSubmit: string;
    btnSending: string;
    configuredProduct: string;
    productTitle: string;
    productColor: string;
    summaryCosts: string;
    summaryQty: string;
    summaryBasePrice: string;
    summaryDiscount: string;
    summaryTotal: string;
    estDeliveryHeader: string;
    estDelivery100: string;
    estDelivery50: string;
    estDeliveryBase: string;
    supportHeader: string;
    supportDesc: string;
    successHeader: string;
    successBody: string;
    successConfirmEmail: string;
    successConfirmPrice: string;
    successConfirmQty: string;
    successConfirmTimeline: string;
    successReset: string;
  };
  showroom: {
    badge: string;
    title: string;
    desc: string;
    angle: string;
    hint: string;
  };
}

export const translations: Record<Locale, TranslationDict> = {
  it: {
    navbar: {
      steps: {
        1: "Colore",
        2: "Logo",
        3: "Posizione",
        4: "Anteprima",
        5: "Ordine",
      },
      order: "Ordine",
    },
    hero: {
      badge: "Couture On-Demand",
      title: "Merch Studio",
      subtitle: "L'ATELIER DIGITALE DELLA PERSONALIZZAZIONE COUTURE.",
      description:
        "Benvenuto nell'atelier digitale per abbigliamento su misura. Combiniamo la precisione del design vettoriale in tempo reale con i più alti standard di stampa artigianale. Crea capi iconici per il tuo brand, posiziona liberamente il tuo logo e ordina in volumi con sconti automatizzati.",
      btnCreate: "Crea Ora",
      btnExplore: "Scopri Atelier",
      conceptBadge: "Il Concetto",
      conceptTitle: "Stampa di Alta Qualità",
      conceptDesc:
        "Non siamo la solita stampa veloce. Ogni maglietta è realizzata in cotone biologico morbido e resistente, tinta con metodi ecologici e stampata con inchiostri all'acqua che penetrano nel tessuto. Il risultato? Una maglietta incredibilmente soffice al tatto, con colori vivi e una stampa che dura per sempre, lavaggio dopo lavaggio.",
      footer: "© 2026 Merch Studio. Digital Couture Atelier. Tutti i diritti riservati.",
    },
    step1: {
      step: "Step 01",
      sub: "Tessuto",
      title: "Scegli il Colore",
      desc: "Seleziona la tonalità di base per la tua maglietta couture. Tutti i nostri capi sono realizzati in cotone biologico pettinato da 240g/m².",
      selected: "Selezionato",
      btnNext: "Continua",
    },
    step2: {
      step: "Step 02",
      sub: "Grafica",
      title: "Carica il tuo Logo",
      desc: "Aggiungi il tuo brand, logo o una grafica personalizzata. Per risultati ottimali di stampa serigrafica digitale, consigliamo file PNG ad alta risoluzione con sfondo trasparente o file vettoriali SVG.",
      dropzoneActive: "Rilascia il file qui",
      dropzoneIdle: "Trascina il logo qui",
      dropzoneBrowse: "oppure clicca per selezionare un file da esplorare",
      formats: "PNG, SVG, JPG, WebP • MAX 10MB",
      sizeError: "La dimensione del file supera il limite di 10MB.",
      formatError: "Formato non supportato. Carica un file PNG, JPG, SVG o WebP.",
      readError: "Errore durante la lettura del file. Riprova.",
      remove: "Rimuovi logo",
      ready: "Pronto per la stampa",
      btnBack: "← Indietro",
      btnNext: "Posiziona Logo",
    },
    step3: {
      step: "Step 03",
      sub: "Composizione",
      title: "Posiziona Grafica",
      desc: "Usa i controlli sottostanti o trascina direttamente la grafica sulla t-shirt per posizionarla e ridimensionarla. Il logo rimarrà confinato all'interno dell'area di stampa sicura.",
      dragTipHeader: "Controllo Interattivo",
      dragTipBody: "Puoi cliccare e trascinare il logo sul petto del capo",
      presetsHeader: "Allineamenti Rapidi",
      presetLeft: "Sinistra petto",
      presetCenter: "Centro petto",
      presetRight: "Destra petto",
      sliderScale: "Dimensione",
      sliderRotation: "Rotazione",
      reset: "Resetta posizionamento",
      btnBack: "← Indietro",
      btnNext: "Vedi Anteprima",
    },
    step4: {
      step: "Step 04",
      sub: "Approvazione",
      title: "Prodotto Finito",
      desc: "Ecco l'anteprima realistica in tempo reale della tua maglietta personalizzata. Rivedi con cura i dettagli tecnici prima di confermare la tua produzione.",
      summaryHeader: "Riepilogo Configurazione",
      fabricColor: "Colore Tessuto",
      printLogo: "Grafica Stampa",
      logoPosition: "Specifiche Posizione",
      editColor: "Modifica colore",
      editLogo: "Modifica logo",
      editPosition: "Modifica posizionamento",
      positionCenter: "Centro petto (Allineato)",
      positionLeft: "Sinistra petto (Standard)",
      positionRight: "Destra petto (Standard)",
      positionCustom: "Personalizzato (Offset: {x}px a {xDir}, {y}px in {yDir})",
      btnBack: "← Indietro",
      btnNext: "Procedi all'Ordine",
    },
    step5: {
      step: "Step 05",
      sub: "Produzione",
      title: "Scheda Ordine",
      desc: "Completa i tuoi dettagli di contatto e spedizione. Il nostro atelier elaborerà la richiesta e ti contatterà entro 24 ore per confermare la bozza tecnica prima di avviare i telai di stampa.",
      secContact: "01. Informazioni di Contatto",
      labelName: "Nome e Cognome",
      placeName: "Esempio: Marco Rossi",
      errName: "Il nome è richiesto",
      labelEmail: "Indirizzo Email",
      placeEmail: "Esempio: marco@studio.com",
      errEmail: "L'email è richiesta",
      errEmailFormat: "Indirizzo email non valido",
      labelPhone: "Numero di Telefono (Opzionale)",
      placePhone: "Esempio: +39 333 1234567",
      secSizes: "02. Distribuzione Taglie",
      sizesApplied: "Sconto applicato",
      errQuantity: "Seleziona almeno 1 maglietta nelle taglie",
      errMaxQuantity: "Il limite massimo per ordine è 500 magliette",
      secAddress: "03. Destinazione Spedizione",
      labelStreet: "Via e Numero Civico",
      placeStreet: "Esempio: Corso Vittorio Emanuele II, 42",
      errStreet: "La via è richiesta",
      labelCity: "Città",
      placeCity: "Milano",
      errCity: "La città è richiesta",
      labelZip: "CAP",
      placeZip: "20121",
      errZip: "Il CAP è richiesto",
      labelCountry: "Paese",
      secNotes: "04. Note Aggiuntive (Opzionale)",
      placeNotes: "Indica richieste particolari: colori pantone precisi, layout alternativi sul retro o altre personalizzazioni...",
      btnBack: "← Indietro",
      btnSubmit: "Invia richiesta ordine →",
      btnSending: "Trasmissione...",
      configuredProduct: "Prodotto configurato",
      productTitle: "T-shirt Studio Custom",
      productColor: "Colore tessuto",
      summaryCosts: "Riepilogo Costi",
      summaryQty: "Quantità totale",
      summaryBasePrice: "Prezzo base unitario",
      summaryDiscount: "Sconto quantità",
      summaryTotal: "Totale Stimato",
      estDeliveryHeader: "Consegna Stimata",
      estDelivery100: "10-14 giorni lavorativi (Spedizione Express)",
      estDelivery50: "7-10 giorni lavorativi",
      estDeliveryBase: "5-7 giorni lavorativi",
      supportHeader: "Assistenza Atelier",
      supportDesc: "Bozza tecnica PDF inviata via email prima della produzione fisica",
      successHeader: "Richiesta Ricevuta!",
      successBody: "Grazie per aver scelto MERCH STUDIO. Abbiamo caricato la tua configurazione e generato la bozza tecnica ad alta risoluzione.",
      successConfirmEmail: "Email di conferma",
      successConfirmPrice: "Prezzo concordato",
      successConfirmQty: "Quantità magliette",
      successConfirmTimeline: "Ti contatteremo entro 24 ore per confermare la messa in tavola finale.",
      successReset: "Crea un'altra maglietta",
    },
    showroom: {
      badge: "3D Studio",
      title: "Deconstructed Tee",
      desc: "Modello di ispirazione couture in 360°",
      angle: "Angolo di vista",
      hint: "Trascina per ruotare",
    },
  },
  en: {
    navbar: {
      steps: {
        1: "Color",
        2: "Logo",
        3: "Position",
        4: "Preview",
        5: "Order",
      },
      order: "Order",
    },
    hero: {
      badge: "Couture On-Demand",
      title: "Merch Studio",
      subtitle: "THE DIGITAL ATELIER OF CUSTOM FASHION COUTURE.",
      description:
        "Welcome to the digital atelier for custom-tailored apparel. We combine real-time vector design precision with the highest standard of physical print craftsmanship. Create iconic garments for your brand, position your logo freely, and order in volume with automated discounts.",
      btnCreate: "Design Now",
      btnExplore: "Discover Atelier",
      conceptBadge: "The Concept",
      conceptTitle: "Premium Quality Printing",
      conceptDesc:
        "We are not your average fast print shop. Every t-shirt is made from soft, durable organic cotton, dyed using eco-friendly methods, and printed with water-based inks that blend into the fabric. The result? An incredibly soft shirt with vibrant colors and a print that lasts forever, wash after wash.",
      footer: "© 2026 Merch Studio. Digital Couture Atelier. All rights reserved.",
    },
    step1: {
      step: "Step 01",
      sub: "Fabric",
      title: "Select Color",
      desc: "Select the base color for your custom couture t-shirt. All our garments are constructed from combed organic cotton weighing 240g/m².",
      selected: "Selected",
      btnNext: "Continue",
    },
    step2: {
      step: "Step 02",
      sub: "Artwork",
      title: "Upload your Logo",
      desc: "Add your brand logo or custom artwork. For premium digital silkscreen results, we highly recommend high-resolution PNGs with transparent backgrounds or vector SVG files.",
      dropzoneActive: "Drop the file here",
      dropzoneIdle: "Drag your logo here",
      dropzoneBrowse: "or click to browse local files",
      formats: "PNG, SVG, JPG, WebP • MAX 10MB",
      sizeError: "The file size exceeds our 10MB limit.",
      formatError: "Unsupported format. Please upload a PNG, JPG, SVG, or WebP file.",
      readError: "Error reading file. Please try again.",
      remove: "Remove logo",
      ready: "Ready for printing",
      btnBack: "← Back",
      btnNext: "Position Logo",
    },
    step3: {
      step: "Step 03",
      sub: "Composition",
      title: "Position Artwork",
      desc: "Use the sliders below or drag your logo directly on the t-shirt to position and scale it. The logo will remain strictly inside the safe printable region.",
      dragTipHeader: "Interactive Control",
      dragTipBody: "You can click and drag the logo directly on the chest",
      presetsHeader: "Quick Alignments",
      presetLeft: "Left chest",
      presetCenter: "Center chest",
      presetRight: "Right chest",
      sliderScale: "Dimensions",
      sliderRotation: "Rotation",
      reset: "Reset placement",
      btnBack: "← Back",
      btnNext: "View Preview",
    },
    step4: {
      step: "Step 04",
      sub: "Approval",
      title: "Finished Product",
      desc: "Review the realistic real-time preview of your custom t-shirt. Double-check all technical specifications before confirming production.",
      summaryHeader: "Configuration Summary",
      fabricColor: "Fabric Color",
      printLogo: "Printed Artwork",
      logoPosition: "Position Specifics",
      editColor: "Modify color",
      editLogo: "Modify logo",
      editPosition: "Modify position",
      positionCenter: "Center Chest (Aligned)",
      positionLeft: "Left Chest (Standard)",
      positionRight: "Right Chest (Standard)",
      positionCustom: "Custom (Offset: {x}px to {xDir}, {y}px to {yDir})",
      btnBack: "← Back",
      btnNext: "Proceed to Order",
    },
    step5: {
      step: "Step 05",
      sub: "Production",
      title: "Order Sheet",
      desc: "Complete your contact and shipping details. Our atelier will review your request and contact you within 24 hours to confirm the technical blueprint before starting production.",
      secContact: "01. Contact Information",
      labelName: "Full Name",
      placeName: "Example: John Doe",
      errName: "Name is required",
      labelEmail: "Email Address",
      placeEmail: "Example: john@studio.com",
      errEmail: "Email is required",
      errEmailFormat: "Invalid email address",
      labelPhone: "Phone Number (Optional)",
      placePhone: "Example: +1 555 1234567",
      secSizes: "02. Size Distribution",
      sizesApplied: "Discount applied",
      errQuantity: "Please select at least 1 t-shirt across sizes",
      errMaxQuantity: "Maximum order limit is 500 t-shirts",
      secAddress: "03. Shipping Destination",
      labelStreet: "Street Address",
      placeStreet: "Example: 123 Fifth Avenue, Apt 4B",
      errStreet: "Street address is required",
      labelCity: "City",
      placeCity: "New York",
      errCity: "City is required",
      labelZip: "Postal / ZIP Code",
      placeZip: "10001",
      errZip: "ZIP code is required",
      labelCountry: "Country",
      secNotes: "04. Special Instructions (Optional)",
      placeNotes: "Indicate special requests: specific Pantone colors, back-print layouts, or other customization demands...",
      btnBack: "← Back",
      btnSubmit: "Submit order request →",
      btnSending: "Transmitting...",
      configuredProduct: "Configured product",
      productTitle: "Custom Studio T-shirt",
      productColor: "Fabric color",
      summaryCosts: "Cost Summary",
      summaryQty: "Total quantity",
      summaryBasePrice: "Base unit price",
      summaryDiscount: "Quantity discount",
      summaryTotal: "Estimated Total",
      estDeliveryHeader: "Estimated Delivery",
      estDelivery100: "10-14 business days (Express Shipping)",
      estDelivery50: "7-10 business days",
      estDeliveryBase: "5-7 business days",
      supportHeader: "Atelier Support",
      supportDesc: "High-res PDF technical draft sent via email prior to physical production",
      successHeader: "Request Received!",
      successBody: "Thank you for choosing MERCH STUDIO. We have saved your configuration and generated your high-resolution digital proof.",
      successConfirmEmail: "Confirmation email",
      successConfirmPrice: "Agreed price",
      successConfirmQty: "T-shirt quantity",
      successConfirmTimeline: "We will contact you within 24 hours to confirm the final technical layout.",
      successReset: "Design another t-shirt",
    },
    showroom: {
      badge: "3D Studio",
      title: "Deconstructed Tee",
      desc: "360° couture-inspired model",
      angle: "Camera Angle",
      hint: "Drag to rotate",
    },
  },
  es: {
    navbar: {
      steps: {
        1: "Color",
        2: "Logo",
        3: "Posición",
        4: "Vista previa",
        5: "Pedido",
      },
      order: "Pedido",
    },
    hero: {
      badge: "Couture On-Demand",
      title: "Merch Studio",
      subtitle: "EL TALLER DIGITAL DE LA PERSONALIZACIÓN COUTURE.",
      description:
        "Bienvenido al taller digital de ropa a medida. Combinamos la precisión del diseño vectorial en tiempo real con los estándares más altos de impresión artesanal. Crea prendas icónicas para tu marca, posiciona tu logo libremente y ordena en volumen con descuentos automatizados.",
      btnCreate: "Diseñar Ahora",
      btnExplore: "Descubrir Taller",
      conceptBadge: "El Concepto",
      conceptTitle: "Impresión de Alta Calidad",
      conceptDesc:
        "No somos la típica imprenta rápida. Cada camiseta está hecha de algodón orgánico suave y resistente, teñida con métodos ecológicos e impresa con tintas al agua que se fundan en el tejido. ¿El resultado? Una camiseta increíblemente suave al tacto, con colores de gran viveza y un estampado que dura para siempre, lavado tras lavado.",
      footer: "© 2026 Merch Studio. Digital Couture Atelier. Todos los derechos reservados.",
    },
    step1: {
      step: "Paso 01",
      sub: "Tejido",
      title: "Elige el Color",
      desc: "Selecciona el tono base de tu camiseta couture. Todas nuestras prendas se confeccionan con algodón orgánico peinado de 240g/m².",
      selected: "Seleccionado",
      btnNext: "Continuar",
    },
    step2: {
      step: "Paso 02",
      sub: "Gráfico",
      title: "Sube tu Logo",
      desc: "Añade el logo de tu marca o un gráfico personalizado. Para obtener resultados serigráficos de primera, aconsejamos archivos PNG de alta resolución con fondo transparente o vectoriales SVG.",
      dropzoneActive: "Suelte el archivo aquí",
      dropzoneIdle: "Arrastra tu logo aquí",
      dropzoneBrowse: "o haz clic para explorar tus archivos",
      formats: "PNG, SVG, JPG, WebP • MÁX 10MB",
      sizeError: "El tamaño del archivo supera el límite de 10MB.",
      formatError: "Formato no compatible. Sube un archivo PNG, JPG, SVG o WebP.",
      readError: "Error al leer el archivo. Inténtalo de nuevo.",
      remove: "Eliminar logo",
      ready: "Listo para imprimir",
      btnBack: "← Atrás",
      btnNext: "Posicionar Logo",
    },
    step3: {
      step: "Paso 03",
      sub: "Composición",
      title: "Posicionar Gráfico",
      desc: "Usa los controles inferiores o arrastra directamente el diseño sobre la camiseta para ubicarlo y escalarlo. El logo quedará dentro de la zona de impresión segura.",
      dragTipHeader: "Control Interactivo",
      dragTipBody: "Puedes hacer clic y arrastrar el logo directamente sobre el pecho",
      presetsHeader: "Alineaciones Rápidas",
      presetLeft: "Pecho izquierdo",
      presetCenter: "Centro pecho",
      presetRight: "Pecho derecho",
      sliderScale: "Dimensión",
      sliderRotation: "Rotación",
      reset: "Restablecer posición",
      btnBack: "← Atrás",
      btnNext: "Ver Vista Previa",
    },
    step4: {
      step: "Paso 04",
      sub: "Aprobación",
      title: "Producto Terminado",
      desc: "Aquí tienes la vista previa realista en tiempo real de tu camiseta personalizada. Revisa con cuidado las especificaciones técnicas antes de confirmar la producción.",
      summaryHeader: "Resumen de Configuración",
      fabricColor: "Color del Tejido",
      printLogo: "Gráfico de Impresión",
      logoPosition: "Especificaciones de Posición",
      editColor: "Modificar color",
      editLogo: "Modificar logo",
      editPosition: "Modificar posición",
      positionCenter: "Centro pecho (Alineado)",
      positionLeft: "Pecho izquierdo (Estándar)",
      positionRight: "Pecho derecho (Estándar)",
      positionCustom: "Personalizado (Desplazamiento: {x}px a la {xDir}, {y}px al {yDir})",
      btnBack: "← Atrás",
      btnNext: "Proceder al Pedido",
    },
    step5: {
      step: "Paso 05",
      sub: "Producción",
      title: "Ficha de Pedido",
      desc: "Completa tus datos de contacto y entrega. Nuestro taller procesará la solicitud y te contactará en 24 horas para confirmar la ficha técnica antes de iniciar la impresión.",
      secContact: "01. Información de Contacto",
      labelName: "Nombre y Apellidos",
      placeName: "Ejemplo: Carlos Pérez",
      errName: "El nombre es obligatorio",
      labelEmail: "Correo Electrónico",
      placeEmail: "Ejemplo: carlos@studio.com",
      errEmail: "El correo es obligatorio",
      errEmailFormat: "Dirección de correo no válida",
      labelPhone: "Teléfono (Opcional)",
      placePhone: "Ejemplo: +34 600 123456",
      secSizes: "02. Distribución de Tallas",
      sizesApplied: "Descuento aplicado",
      errQuantity: "Selecciona al menos 1 camiseta en las tallas",
      errMaxQuantity: "El límite de pedido es de 500 camisetas",
      secAddress: "03. Destino del Envío",
      labelStreet: "Calle y Número",
      placeStreet: "Ejemplo: Gran Vía, 28, Piso 3A",
      errStreet: "La dirección es obligatoria",
      labelCity: "Ciudad",
      placeCity: "Madrid",
      errCity: "La ciudad es obligatoria",
      labelZip: "Código Postal",
      placeZip: "28013",
      errZip: "El código postal es obligatorio",
      labelCountry: "País",
      secNotes: "04. Notas Adicionales (Opcional)",
      placeNotes: "Indica peticiones especiales: tonos pantone exactos, estampaciones traseras o cualquier otra necesidad...",
      btnBack: "← Atrás",
      btnSubmit: "Enviar solicitud de pedido →",
      btnSending: "Transmitiendo...",
      configuredProduct: "Producto configurado",
      productTitle: "Camiseta Studio Custom",
      productColor: "Color del tejido",
      summaryCosts: "Resumen de Costes",
      summaryQty: "Cantidad total",
      summaryBasePrice: "Precio base unitario",
      summaryDiscount: "Descuento por volumen",
      summaryTotal: "Total Estimado",
      estDeliveryHeader: "Plazo de Entrega",
      estDelivery100: "10-14 días laborables (Envío Express)",
      estDelivery50: "7-10 días laborables",
      estDeliveryBase: "5-7 días laborables",
      supportHeader: "Soporte de Taller",
      supportDesc: "Ficha técnica PDF enviada por email antes de la producción física",
      successHeader: "¡Solicitud Recibida!",
      successBody: "Gracias por elegir MERCH STUDIO. Hemos guardado tu configuración y generado tu boceto digital de alta resolución.",
      successConfirmEmail: "Email de confirmación",
      successConfirmPrice: "Precio acordado",
      successConfirmQty: "Cantidad de camisetas",
      successConfirmTimeline: "Te contactaremos en menos de 24 horas para confirmar la ficha técnica final.",
      successReset: "Diseñar otra camiseta",
    },
    showroom: {
      badge: "3D Studio",
      title: "Deconstructed Tee",
      desc: "Modelo de inspiración couture en 360°",
      angle: "Ángulo de cámara",
      hint: "Arrastra para rotar",
    },
  },
};
