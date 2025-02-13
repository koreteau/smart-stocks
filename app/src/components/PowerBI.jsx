import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBI() {
    const embedConfig = {
        type: "report",  // Type d'objet Power BI (report, dashboard, etc.)
        id: "TON_REPORT_ID",  // Remplace par l'ID de ton rapport
        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=TON_REPORT_ID", // URL d'intégration
        accessToken: "TON_ACCESS_TOKEN", // Ton token d'accès Power BI
        settings: {
            panes: {
                filters: {
                    visible: false
                },
                pageNavigation: {
                    visible: false
                }
            }
        }
    };

    return (
        <>
            {/*
            <div style={{ height: "100%", width: "100%" }}>
                <PowerBIEmbed
                    embedConfig={embedConfig}
                    eventHandlers={
                        new Map([
                            ["loaded", () => console.log("Report chargé !")],
                            ["rendered", () => console.log("Report affiché !")],
                            ["error", (event) => console.error(event.detail)]
                        ])
                    }
                    cssClassName="powerbi-container"
                />
            </div>
            */}
            < iframe title="epitech_projet_data"
                width="100%"
                height="700"
                src="https://app.powerbi.com/view?r=eyJrIjoiYjFhMDFiYzAtNzBlZi00YzM0LWExMDEtMTJkZGQ4ZGU4NzI5IiwidCI6IjBlM2Q5NTBjLWYwMjgtNDNlYy05NjNiLWMwNjAyNzVlNmJiYyIsImMiOjh9&embed=true"
                frameborder="0"
                allowFullScreen="true" >
            </iframe >
        </>
    );
}
