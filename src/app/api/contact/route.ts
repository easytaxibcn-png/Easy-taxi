import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre, email, telefono, tipoTaxi, origen, destino, fecha, hora, pasajeros, mensaje } = body

        // Validación básica
        if (!nombre || !email || !telefono || !origen || !destino || !fecha || !hora) {
            return NextResponse.json({ success: false, message: "Faltan campos obligatorios" }, { status: 400 })
        }

        // Configurar el transporter de Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        // Mapear valores a labels legibles
        const tipoTaxiLabels: Record<string, string> = {
            estandar: "Taxi Estándar",
            "7-8-plazas": "7/8 Plazas",
            premium: "Premium",
            adaptado: "Adaptado PMR",
        }

        const destinoLabels: Record<string, string> = {
            "aeropuerto-prat": "Aeropuerto El Prat",
            "aeropuerto-girona": "Aeropuerto Girona",
            lloret: "Lloret del Mar",
            "port-aventura": "Port Aventura",
            andorra: "Andorra",
            tarragona: "Tarragona",
            otro: "Otro destino",
        }

        const htmlContentAdmin = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Reserva - Easy Taxi BCN</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f0f0f; color: #ffffff; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #0f0f0f; padding-bottom: 60px; }
        .main { background-color: #1a1a1a; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; border-radius: 20px; overflow: hidden; border: 1px solid #333; }
        .header { background-color: #fbb024; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .section-title { font-size: 11px; font-weight: 900; color: #fbb024; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: block; }
        .data-card { background-color: #252525; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #fbb024; }
        .field { margin-bottom: 15px; }
        .field:last-child { margin-bottom: 0; }
        .label { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px; display: block; }
        .value-yellow { color: #fbb024; font-style: italic; }
        .btn { display: inline-block; background-color: #fff; color: #000; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: 800; text-transform: uppercase; font-size: 14px; margin-top: 20px; transition: all .3s; }
        .footer { padding: 30px; text-align: center; font-size: 11px; color: #555; }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table class="main" role="presentation">
          <tr>
            <td class="header">
              <span style="background: #000; color: #fbb024; padding: 8px 15px; border-radius: 8px; font-weight: 900; font-size: 20px;">T</span>
              <h1 style="color: #000; margin: 20px 0 5px 0; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;">NUEVA RESERVA</h1>
              <p style="color: rgba(0,0,0,0.6); margin: 0; font-weight: 700; font-size: 14px;">⚡️ Contactar urgente</p>
            </td>
          </tr>
          <tr>
            <td class="content">
              <span class="section-title">👤 DATOS DEL CLIENTE</span>
              <div class="data-card">
                <div class="field">
                  <span class="label">Nombre completo</span>
                  <span class="value">${nombre}</span>
                </div>
                <div class="field">
                  <span class="label">Teléfono Móvil</span>
                  <a href="tel:${telefono}" class="value" style="color: #fbb024; text-decoration: none;">${telefono}</a>
                </div>
                <div class="field">
                  <span class="label">Correo Electrónico</span>
                  <a href="mailto:${email}" class="value" style="text-decoration: none;">${email}</a>
                </div>
              </div>

              <span class="section-title">🚖 DETALLES DEL TRAYECTO</span>
              <div class="data-card" style="border-left-color: #fff;">
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                  <div style="flex: 1;">
                    <span class="label">📅 Fecha</span>
                    <span class="value">${fecha}</span>
                  </div>
                  <div style="flex: 1;">
                    <span class="label">🕐 Hora</span>
                    <span class="value">${hora}</span>
                  </div>
                </div>
                <div class="field">
                  <span class="label">📍 Origen</span>
                  <span class="value">${origen}</span>
                </div>
                <div class="field">
                  <span class="label">🏁 Destino</span>
                  <span class="value">${destinoLabels[destino] || destino}</span>
                </div>
                <div class="field">
                  <span class="label">Tipo de Vehículo</span>
                  <span class="value value-yellow">${tipoTaxiLabels[tipoTaxi] || tipoTaxi}</span>
                </div>
                <div class="field">
                  <span class="label">Pasajeros</span>
                  <span class="value">${pasajeros} persona(s)</span>
                </div>
              </div>

              ${mensaje ? `
              <span class="section-title">💬 NOTAS ADICIONALES</span>
              <div class="data-card" style="border-left-color: #555;">
                <span class="value" style="font-weight: 400; font-style: italic; font-size: 14px; line-height: 1.6; color: #ccc;">"${mensaje}"</span>
              </div>
              ` : ''}

              <div style="text-align: center;">
                <a href="tel:${telefono}" class="btn">LLAMAR AHORA</a>
              </div>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p>Easy Taxi BCN &copy; ${new Date().getFullYear()} | Panel de Administración</p>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
    `

        const htmlContentClient = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Reserva - Easy Taxi BCN</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #0a0a0a; color: #ffffff; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #0a0a0a; padding-bottom: 60px; }
        .main { background-color: #121212; margin: 40px auto; width: 100%; max-width: 600px; border-spacing: 0; border-radius: 30px; overflow: hidden; }
        .hero { background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 60px 40px; text-align: center; position: relative; border-bottom: 1px solid #333; }
        .status-badge { background-color: #fbb024; color: #000; padding: 6px 15px; border-radius: 20px; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 20px; }
        .content { padding: 50px 40px; }
        .receipt { background-color: #1a1a1a; border: 1px solid #333; border-radius: 20px; padding: 30px; }
        .receipt-row { padding: 15px 0; border-bottom: 1px solid #252525; }
        .receipt-row:last-child { border-bottom: none; }
        .label { font-size: 10px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 14px; font-weight: 700; color: #fff; margin-top: 5px; }
        .footer { padding: 40px; text-align: center; background-color: #000; }
        .social-link { color: #fbb024; text-decoration: none; font-weight: 700; margin: 0 10px; }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table class="main" role="presentation">
          <tr>
            <td class="hero">
              <div class="status-badge">RECIBIDO CORRECTAMENTE</div>
              <h1 style="color: #fff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">¡Gracias, ${nombre}!</h1>
              <p style="color: #888; margin: 15px 0 0 0; font-size: 16px; font-style: italic;">Hemos recibido tu solicitud de reserva en Easy Taxi BCN.</p>
            </td>
          </tr>
          <tr>
            <td class="content">
              <h2 style="font-size: 18px; font-weight: 900; color: #fbb024; margin-bottom: 30px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">⚙️ Próximos pasos</h2>
              <p style="color: #ccc; font-size: 15px; line-height: 1.6; text-align: center; margin-bottom: 40px;">
                Nuestro equipo está procesando tu solicitud. Te enviaremos una <strong>confirmación final</strong> por WhatsApp o llamada en los próximos minutos.
              </p>

              <div class="receipt">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                  <span style="font-size: 12px; font-weight: 900; color: #fff; text-transform: uppercase;">Resumen del viaje</span>
                  <span style="font-size: 10px; color: #555;">BCN-${Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>
                
                <div class="receipt-row">
                  <table width="100%">
                    <tr>
                      <td width="50%">
                        <span class="label">📅 Fecha</span>
                        <div class="value">${fecha}</div>
                      </td>
                      <td width="50%">
                        <span class="label">🕐 Hora</span>
                        <div class="value">${hora}</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="receipt-row">
                  <span class="label">📍 Punto de Recogida</span>
                  <div class="value">${origen}</div>
                </div>

                <div class="receipt-row">
                  <span class="label">🏁 Destino</span>
                  <div class="value">${destinoLabels[destino] || destino}</div>
                </div>

                <div class="receipt-row">
                  <table width="100%">
                    <tr>
                      <td width="50%">
                        <span class="label">🚗 Vehículo</span>
                        <div class="value" style="color: #fbb024;">${tipoTaxiLabels[tipoTaxi] || tipoTaxi}</div>
                      </td>
                      <td width="50%">
                        <span class="label">👥 Pasajeros</span>
                        <div class="value">${pasajeros}</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                <p style="color: #555; font-size: 13px;">¿Necesitas hacer cambios?</p>
                <a href="tel:+34641230218" style="color: #fff; font-weight: 900; font-size: 18px; text-decoration: none;">+34 641 230 218</a>
              </div>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p style="color: #fff; font-weight: 900; font-size: 14px; margin-bottom: 15px;">Easy Taxi BCN</p>
              <div style="margin-bottom: 20px;">
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">WhatsApp</a>
              </div>
              <p style="color: #333; font-size: 10px;">Enviado automáticamente. No respondas a este mensaje.</p>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
    `

        // Enviar email a la administración
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || "easytaxibcn@gmail.com",
            replyTo: email,
            subject: `🚕 Nueva Reserva de Taxi - ${nombre}`,
            html: htmlContentAdmin,
        })

        // Enviar email de confirmación al cliente
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: "✅ Confirmación de tu solicitud de reserva - Easy Taxi BCN",
            html: htmlContentClient,
        })

        return NextResponse.json({ success: true, message: "Reserva enviada correctamente" })
    } catch (error) {
        console.error("Error enviando email:", error)
        return NextResponse.json({ success: false, message: "Error al enviar la reserva" }, { status: 500 })
    }
}
