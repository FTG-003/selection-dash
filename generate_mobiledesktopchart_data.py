
import pandas as pd
import json

df = pd.read_json("/home/ubuntu/cyber-dashboard-template-project/public/mocks/simulated_data.json")

# Aggrega i dati per Fase e Gruppo, calcolando la media dell'EQI
phase_group_avg_eqi = df.groupby(["Phase", "Group"])["EQI"].mean().unstack(fill_value=0)

# Prepara i dati per il formato richiesto dal grafico
series = []
for group in phase_group_avg_eqi.columns:
    series.append({
        "name": group,
        "data": phase_group_avg_eqi[group].round(2).tolist()
    })

mobile_desktop_chart_data = {
    "series": series,
    "categories": phase_group_avg_eqi.index.tolist()
}

with open("/home/ubuntu/cyber-dashboard-template-project/public/mocks/MobileDesktopChart.json", "w") as f:
    json.dump(mobile_desktop_chart_data, f, indent=4)

print("Dati per MobileDesktopChart generati e salvati in MobileDesktopChart.json")


