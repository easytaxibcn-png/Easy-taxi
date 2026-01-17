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
            sitges: "Sitges",
            tarragona: "Tarragona",
            otro: "Otro destino",
        }

        const htmlContentAdmin = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 40px; text-align: center;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <div style="background-color: #FFD700; width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; font-size: 28px;">🚕</div>
                        <h1 style="color: #FFD700; margin: 15px 0 5px 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">NUEVA RESERVA</h1>
                        <p style="color: #cccccc; margin: 0; font-size: 14px;">Easy Taxi BCN</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Alert Banner -->
              <tr>
                <td style="background-color: #FFD700; padding: 12px 40px; text-align: center;">
                  <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 14px;">⚡ Contactar al cliente en menos de 10 minutos</p>
                </td>
              </tr>

              <!-- Client Data Section -->
              <tr>
                <td style="padding: 30px 40px 20px 40px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 10px; border-left: 4px solid #FFD700;">
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 18px; display: flex; align-items: center;">
                          <span style="background-color: #1a1a1a; color: #FFD700; width: 28px; height: 28px; border-radius: 50%; display: inline-block; text-align: center; line-height: 28px; font-size: 14px; margin-right: 10px;">👤</span>
                          Datos del Cliente
                        </h2>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                              <span style="color: #6c757d; font-size: 13px;">Nombre</span><br>
                              <span style="color: #1a1a1a; font-size: 15px; font-weight: 600;">${nombre}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                              <span style="color: #6c757d; font-size: 13px;">Email</span><br>
                              <a href="mailto:${email}" style="color: #1a1a1a; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #6c757d; font-size: 13px;">Teléfono</span><br>
                              <a href="tel:${telefono}" style="color: #1a1a1a; font-size: 15px; font-weight: 600; text-decoration: none;">${telefono}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Service Details Section -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1a1a1a; border-radius: 10px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="margin: 0 0 20px 0; color: #FFD700; font-size: 18px;">
                          🚖 Detalles del Servicio
                        </h2>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td width="50%" style="padding: 10px 10px 10px 0; vertical-align: top;">
                              <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px;">
                                <span style="color: #FFD700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tipo de Taxi</span><br>
                                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${tipoTaxiLabels[tipoTaxi] || tipoTaxi}</span>
                              </div>
                            </td>
                            <td width="50%" style="padding: 10px 0 10px 10px; vertical-align: top;">
                              <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px;">
                                <span style="color: #FFD700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Pasajeros</span><br>
                                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${pasajeros} persona(s)</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" style="padding: 10px 0;">
                              <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="50%">
                                      <span style="color: #4CAF50; font-size: 12px;">📍 ORIGEN</span><br>
                                      <span style="color: #ffffff; font-size: 14px;">${origen}</span>
                                    </td>
                                    <td width="50%">
                                      <span style="color: #f44336; font-size: 12px;">📍 DESTINO</span><br>
                                      <span style="color: #ffffff; font-size: 14px;">${destinoLabels[destino] || destino}</span>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="50%" style="padding: 10px 10px 10px 0; vertical-align: top;">
                              <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px;">
                                <span style="color: #FFD700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📅 Fecha</span><br>
                                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${fecha}</span>
                              </div>
                            </td>
                            <td width="50%" style="padding: 10px 0 10px 10px; vertical-align: top;">
                              <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px;">
                                <span style="color: #FFD700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">🕐 Hora</span><br>
                                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${hora}</span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${mensaje
                ? `
              <!-- Additional Info -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <div style="background-color: #fff3cd; border-radius: 8px; padding: 15px; border-left: 4px solid #FFD700;">
                    <h3 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 14px;">💬 Información Adicional</h3>
                    <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.5;">${mensaje}</p>
                  </div>
                </td>
              </tr>
              `
                : ""
            }

              <!-- Footer -->
              <tr>
                <td style="background-color: #1a1a1a; padding: 20px 40px; text-align: center;">
                  <p style="margin: 0; color: #888888; font-size: 12px;">
                    Easy Taxi BCN © ${new Date().getFullYear()} | Todos los derechos reservados
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `

        const htmlContentClient = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; text-align: center;">
                  <div style="background-color: #FFD700; width: 80px; height: 80px; border-radius: 50%; display: inline-block; line-height: 80px; font-size: 40px; margin-bottom: 15px;">🚕</div>
                  <h1 style="color: #FFD700; margin: 0 0 5px 0; font-size: 32px; font-weight: 700;">Easy Taxi BCN</h1>
                  <p style="color: #cccccc; margin: 0; font-size: 14px; letter-spacing: 2px;">SERVICIO DE TAXI BARCELONA</p>
                </td>
              </tr>

              <!-- Success Message -->
              <tr>
                <td style="padding: 30px 40px 20px 40px; text-align: center;">
                  <div style="background-color: #d4edda; border-radius: 50%; width: 60px; height: 60px; display: inline-block; line-height: 60px; font-size: 30px; margin-bottom: 15px;">✓</div>
                  <h2 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 24px;">¡Gracias, ${nombre}!</h2>
                  <p style="color: #6c757d; margin: 0; font-size: 16px; line-height: 1.6;">
                    Hemos recibido tu solicitud de reserva correctamente.
                  </p>
                </td>
              </tr>

              <!-- Time Alert -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <div style="background-color: #FFD700; border-radius: 10px; padding: 20px; text-align: center;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      ⏱️ Te contactaremos lo antes posible  para confirmar tu reserva
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Reservation Summary -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <div style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #FFD700; padding: 15px 20px;">
                      <h3 style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">📋 RESUMEN DE TU RESERVA</h3>
                    </div>
                    <div style="padding: 20px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #333;">
                            <span style="color: #FFD700; font-size: 12px; text-transform: uppercase;">Tipo de Taxi</span><br>
                            <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${tipoTaxiLabels[tipoTaxi] || tipoTaxi}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #333;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="50%">
                                  <span style="color: #4CAF50; font-size: 12px;">📍 ORIGEN</span><br>
                                  <span style="color: #ffffff; font-size: 14px;">${origen}</span>
                                </td>
                                <td width="50%">
                                  <span style="color: #f44336; font-size: 12px;">📍 DESTINO</span><br>
                                  <span style="color: #ffffff; font-size: 14px;">${destinoLabels[destino] || destino}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #333;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="50%">
                                  <span style="color: #FFD700; font-size: 12px;">📅 FECHA</span><br>
                                  <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${fecha}</span>
                                </td>
                                <td width="50%">
                                  <span style="color: #FFD700; font-size: 12px;">🕐 HORA</span><br>
                                  <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${hora}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <span style="color: #FFD700; font-size: 12px; text-transform: uppercase;">Pasajeros</span><br>
                            <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${pasajeros} persona(s)</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Contact Info -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <div style="background-color: #f8f9fa; border-radius: 10px; padding: 20px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">¿Tienes alguna pregunta?</p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      📞 Llámanos o escríbenos por WhatsApp
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #FFD700; font-size: 14px; font-weight: 600;">Easy Taxi BCN</p>
                  <p style="margin: 0; color: #888888; font-size: 12px;">
                    © ${new Date().getFullYear()} Todos los derechos reservados
                  </p>
                  <p style="margin: 10px 0 0 0; color: #666666; font-size: 11px;">
                    Este correo ha sido enviado automáticamente. Por favor, no respondas a este mensaje.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
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
