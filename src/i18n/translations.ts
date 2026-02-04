export type Language = "es" | "en"

export type TranslationType = {
  nav: {
    inicio: string
    tipos: string
    servicios: string
    precios: string
    contacto: string
  }
  hero: {
    title: string
    highlight: string
    description: string
    secondary: string
    cta: string
    badge: string
  }
  header: {
    reserve: string
    call: string
  }
  features: {
    price: { title: string; subtitle: string }
    payment: { title: string; subtitle: string }
    seats: { title: string; subtitle: string }
    drivers: { title: string; subtitle: string }
    availability: { title: string; subtitle: string }
  }
  howItWorks: {
    title: string
    step1: { title: string; subtitle: string }
    step2: { title: string; subtitle: string }
    step3: { title: string; subtitle: string }
    trust: string
    trustHighlight: string
  }
  drivers: {
    title: string
    subtitle: string
    verified: string
    list: string[]
    rating: string
    regulated: string
  }
  destinations: {
    title: string
    subtitle: string
    items: { [key: string]: string }
  }
  contact: {
    title: string
    subtitle: string
    steps: {
      step1: { title: string; description: string }
      step2: { title: string; description: string }
      step3: { title: string; description: string }
    }
    form: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      phone: string
      phonePlaceholder: string
      taxiType: string
      taxiTypePlaceholder: string
      passengers: string
      passengersPlaceholder: string
      origin: string
      originPlaceholder: string
      destination: string
      destinationPlaceholder: string
      write: string
      popular: string
      map: string
      date: string
      time: string
      additionalInfo: string
      additionalInfoPlaceholder: string
      summaryTitle: string
      summaryName: string
      summaryTaxi: string
      summaryFrom: string
      summaryTo: string
      prev: string
      next: string
      confirm: string
      sending: string
      footer: string
    }
    success: {
      title: string
      message: string
      cta: string
    }
  }
  footer: {
    brand: string
    rights: string
  }
  cookies: {
    title: string
    description: string
    link: string
    accept: string
    necessary: string
  }
  taxiTypes: {
    header: string
    subHeader: string
    categories: {
      plazas: string
      estandar: string
      adaptado: string
      premium: string
    }
    servicesHeader: string
    cta: string
    destinations: {
      [key: string]: {
        label: string
        description: string
        details: string
      }
    }
  }
}

export const translations: Record<Language, TranslationType> = {
  es: {
    nav: {
      inicio: "Inicio",
      tipos: "Nuestros Taxis",
      servicios: "Servicios",
      precios: "Ruta Destinos",
      contacto: "Contacto",
    },
    hero: {
      title: "Taxi Barcelona",
      highlight: "PRECIO CERRADO",
      description: "Taxi en menos de 10 minutos. Taxis hasta 8 plazas, premium y adaptados PMR.",
      secondary: "Reserva ahora y paga al finalizar el servicio",
      cta: "Reservar Ahora",
      badge: "Disponible 24/7",
    },
    header: {
      reserve: "Reservar",
      call: "Llamar",
    },
    features: {
      price: { title: "Precio cerrado", subtitle: "garantizado" },
      payment: { title: "Pago después", subtitle: "del servicio" },
      seats: { title: "Coches hasta 8", subtitle: "plazas" },
      drivers: { title: "Conductores", subtitle: "profesionales" },
      availability: { title: "Taxi 24/7", subtitle: "" },
    },
    howItWorks: {
      title: "¿Cómo funciona nuestro servicio de taxi?",
      step1: { title: "Solicita", subtitle: "tu taxi" },
      step2: { title: "Asignamos el", subtitle: "conductor más cercano" },
      step3: { title: "En menos de 10", subtitle: "minutos estás en marcha" },
      trust: "Trabajamos únicamente con ",
      trustHighlight: "conductores profesionales y autorizados",
    },
    drivers: {
      title: "¿Quién te llevará?",
      subtitle: "Solo taxis oficiales y conductores certificados",
      verified: "Conductores 100% verificados",
      list: [
        "Conductores con licencia oficial del AMB",
        "Examen oficial del Institut Metropolità del Taxi",
        "Vehículos limpios y revisados diariamente",
        "Conductores propios (no subcontratados)",
        "Servicio profesional y regulado",
      ],
      rating: "Valoración media",
      regulated: "Servicio regulado",
    },
    destinations: {
      title: "TE LLEVAMOS A CUALQUIER LUGAR",
      subtitle: "Destinos populares y aeropuertos",
      items: {
        "Lloret del mar": "Lloret del mar",
        "Port aventura": "Port aventura",
        "Andorra": "Andorra",
        "Aeropuerto el prat": "Aeropuerto el prat",
        "Sitges": "Sitges",
        "Tarragona": "Tarragona",
        "Aeropuerto Girona": "Aeropuerto Girona",
        "Costa Brava": "Costa Brava",
      },
    },
    contact: {
      title: "Reserva tu Taxi",
      subtitle: "Completa el formulario en 3 sencillos pasos",
      steps: {
        step1: { title: "Datos personales", description: "Tu información de contacto" },
        step2: { title: "Detalles del viaje", description: "Origen, destino y tipo de taxi" },
        step3: { title: "Fecha y hora", description: "Cuándo te recogemos" },
      },
      form: {
        name: "Nombre completo *",
        namePlaceholder: "Juan Pérez",
        email: "Email *",
        emailPlaceholder: "correo@ejemplo.com",
        phone: "Teléfono *",
        phonePlaceholder: "+34 600 000 000",
        taxiType: "Tipo de taxi *",
        taxiTypePlaceholder: "Selecciona un tipo",
        passengers: "Pasajeros *",
        passengersPlaceholder: "1",
        origin: "Dirección de recogida *",
        originPlaceholder: "Calle, número, ciudad",
        destination: "Destino *",
        destinationPlaceholder: "Escribe la dirección de destino",
        write: "Escribir",
        popular: "Populares",
        map: "Mapa",
        date: "Fecha *",
        time: "Hora *",
        additionalInfo: "Información adicional",
        additionalInfoPlaceholder: "Equipaje especial, silla de bebé, etc.",
        summaryTitle: "Resumen de tu reserva",
        summaryName: "Nombre",
        summaryTaxi: "Taxi",
        summaryFrom: "De",
        summaryTo: "A",
        prev: "Anterior",
        next: "Siguiente",
        confirm: "Confirmar Reserva",
        sending: "Enviando...",
        footer: "Te contactaremos en menos de 10 minutos para confirmar tu reserva",
      },
      success: {
        title: "Reserva Enviada!",
        message: "Hemos recibido tu solicitud. Te contactaremos en menos de 10 minutos para confirmar tu reserva.",
        cta: "Hacer otra reserva",
      },
    },
    footer: {
      brand: "taxiBcn",
      rights: "© 2025 taxiBcn. Todos los derechos reservados",
    },
    cookies: {
      title: "Política de Cookies",
      description: 'Utilizamos cookies propias y de terceros para mejorar nuestros servicios, analizar el tráfico y mostrar publicidad relacionada con tus preferencias. Al hacer clic en "Aceptar", consientes el uso de estas tecnologías. Puedes obtener más información en nuestra ',
      link: "Política de Privacidad",
      accept: "Aceptar todas",
      necessary: "Solo necesarias",
    },
    taxiTypes: {
      header: "Nuestros Taxis",
      subHeader: "Elige el vehículo que mejor se adapte a tu viaje",
      categories: {
        plazas: "7/8 plazas",
        estandar: "Estándar",
        adaptado: "Adaptado PMR",
        premium: "Premium",
      },
      servicesHeader: "Servicios Disponibles",
      cta: "Consigue tu Taxi Ahora",
      destinations: {
        aeropuertos: {
          label: "Aeropuertos",
          description: "Servicio de traslado aeroportuario",
          details: "Traslados puntuales y confiables desde y hacia todos los aeropuertos principales. Seguimiento de vuelos en tiempo real para garantizar su comodidad.",
        },
        recogidas: {
          label: "Recogidas",
          description: "Recogida en cualquier ubicación",
          details: "Servicio de recogida disponible en cualquier punto de la ciudad. Reserve con anticipación o solicite un taxi inmediato según sus necesidades.",
        },
        cruceros: {
          label: "Cruceros",
          description: "Traslados desde puerto",
          details: "Servicio especializado de traslado desde terminales de cruceros. Conductores experimentados que conocen todos los puertos de la región.",
        },
        estaciones: {
          label: "Estaciones",
          description: "Servicio en estaciones de tren",
          details: "Disponibles en todas las principales estaciones de tren y autobús. Servicio rápido y eficiente para conectar con su próximo destino.",
        },
        largasDistancias: {
          label: "Largas Distancias",
          description: "Viajes de larga distancia",
          details: "Servicio premium para viajes largos con vehículos cómodos y conductores profesionales. Tarifas competitivas y sin sorpresas.",
        },
      },
    },
  },
  en: {
    nav: {
      inicio: "Home",
      tipos: "Our Taxis",
      servicios: "Services",
      precios: "Route Destinations",
      contacto: "Contact",
    },
    hero: {
      title: "Barcelona Taxi",
      highlight: "FIXED PRICE",
      description: "Taxi in less than 10 minutes. Taxis up to 8 seats, premium and wheelchair accessible (PMR).",
      secondary: "Book now and pay at the end of the service",
      cta: "Book Now",
      badge: "Available 24/7",
    },
    header: {
      reserve: "Book",
      call: "Call",
    },
    features: {
      price: { title: "Fixed price", subtitle: "guaranteed" },
      payment: { title: "Pay after", subtitle: "the service" },
      seats: { title: "Cars up to 8", subtitle: "seats" },
      drivers: { title: "Professional", subtitle: "drivers" },
      availability: { title: "Taxi 24/7", subtitle: "" },
    },
    howItWorks: {
      title: "How does our taxi service work?",
      step1: { title: "Request", subtitle: "your taxi" },
      step2: { title: "We assign the", subtitle: "nearest driver" },
      step3: { title: "In less than 10", subtitle: "minutes you are on your way" },
      trust: "We work only with ",
      trustHighlight: "professional and authorized drivers",
    },
    drivers: {
      title: "Who will take you?",
      subtitle: "Official taxis and certified drivers only",
      verified: "100% verified drivers",
      list: [
        "Drivers with official AMB license",
        "Official exam from the Institut Metropolità del Taxi",
        "Clean and daily checked vehicles",
        "Own drivers (not subcontracted)",
        "Professional and regulated service",
      ],
      rating: "Average rating",
      regulated: "Regulated service",
    },
    destinations: {
      title: "WE TAKE YOU ANYWHERE",
      subtitle: "Popular destinations and airports",
      items: {
        "Lloret del mar": "Lloret del mar",
        "Port aventura": "Port aventura",
        "Andorra": "Andorra",
        "Aeropuerto el prat": "El Prat Airport",
        "Sitges": "Sitges",
        "Tarragona": "Tarragona",
        "Aeropuerto Girona": "Girona Airport",
        "Costa Brava": "Costa Brava",
      },
    },
    contact: {
      title: "Book your Taxi",
      subtitle: "Complete the form in 3 simple steps",
      steps: {
        step1: { title: "Personal data", description: "Your contact information" },
        step2: { title: "Trip details", description: "Origin, destination and taxi type" },
        step3: { title: "Date and time", description: "When we pick you up" },
      },
      form: {
        name: "Full name *",
        namePlaceholder: "John Doe",
        email: "Email *",
        emailPlaceholder: "email@example.com",
        phone: "Phone *",
        phonePlaceholder: "+34 600 000 000",
        taxiType: "Taxi type *",
        taxiTypePlaceholder: "Select a type",
        passengers: "Passengers *",
        passengersPlaceholder: "1",
        origin: "Pick-up address *",
        originPlaceholder: "Street, number, city",
        destination: "Destination *",
        destinationPlaceholder: "Enter the destination address",
        write: "Write",
        popular: "Popular",
        map: "Map",
        date: "Date *",
        time: "Time *",
        additionalInfo: "Additional info",
        additionalInfoPlaceholder: "Special luggage, baby seat, etc.",
        summaryTitle: "Summary of your booking",
        summaryName: "Name",
        summaryTaxi: "Taxi",
        summaryFrom: "From",
        summaryTo: "To",
        prev: "Previous",
        next: "Next",
        confirm: "Confirm Booking",
        sending: "Sending...",
        footer: "We will contact you in less than 10 minutes to confirm your booking",
      },
      success: {
        title: "Booking Sent!",
        message: "We have received your request. We will contact you in less than 10 minutes to confirm your booking.",
        cta: "Make another booking",
      },
    },
    footer: {
      brand: "easyTaxiBcn",
      rights: "© 2025 easyTaxiBcn. All rights reserved",
    },
    cookies: {
      title: "Cookies Policy",
      description: 'We use our own and third-party cookies to improve our services, analyze traffic and show advertising related to your preferences. By clicking "Accept", you consent to the use of these technologies. You can get more information in our ',
      link: "Privacy Policy",
      accept: "Accept all",
      necessary: "Necessary only",
    },
    taxiTypes: {
      header: "Our Taxis",
      subHeader: "Choose the vehicle that best suits your trip",
      categories: {
        plazas: "7/8 seats",
        estandar: "Standard",
        adaptado: "Accessible (PMR)",
        premium: "Premium",
      },
      servicesHeader: "Available Services",
      cta: "Get your Taxi Now",
      destinations: {
        aeropuertos: {
          label: "Airports",
          description: "Airport transfer service",
          details: "Punctual and reliable transfers to and from all major airports. Real-time flight tracking to ensure your comfort.",
        },
        recogidas: {
          label: "Pick-ups",
          description: "Pick-up from any location",
          details: "Pick-up service available anywhere in the city. Book in advance or request an immediate taxi according to your needs.",
        },
        cruceros: {
          label: "Cruises",
          description: "Port transfers",
          details: "Specialized transfer service from cruise terminals. Experienced drivers who know all the ports in the region.",
        },
        estaciones: {
          label: "Stations",
          description: "Service at train stations",
          details: "Available at all major train and bus stations. Fast and efficient service to connect to your next destination.",
        },
        largasDistancias: {
          label: "Long Distances",
          description: "Long-distance trips",
          details: "Premium service for long trips with comfortable vehicles and professional drivers. Competitive rates and no surprises.",
        },
      },
    },
  },
} as const
