
import pandas as pd
import json

df = pd.read_json("/home/ubuntu/cyber-dashboard-template-project/public/mocks/simulated_data.json")

# Converti la colonna 'Date' in formato datetime
df["Date"] = pd.to_datetime(df["Date"])

# Aggrega i dati per data, calcolando la media delle metriche
daily_avg = df.groupby("Date")[["EQI", "RC", "CDI", "SR"]].mean().reset_index()

# Formatta la data per il grafico
daily_avg["Date"] = daily_avg["Date"].dt.strftime("%Y-%m-%d")

# Prepara i dati per il formato richiesto dal grafico
revenue_chart_data = {
    "series": [
        {
            "name": "EQI Medio",
            "data": daily_avg["EQI"].round(2).tolist()
        },
        {
            "name": "RC Medio",
            "data": daily_avg["RC"].round(2).tolist()
        },
        {
            "name": "CDI Medio",
            "data": daily_avg["CDI"].round(2).tolist()
        },
        {
            "name": "SR Media",
            "data": daily_avg["SR"].round(2).tolist()
        }
    ],
    "categories": daily_avg["Date"].tolist()
}

with open("/home/ubuntu/cyber-dashboard-template-project/public/mocks/RevenueChart.json", "w") as f:
    json.dump(revenue_chart_data, f, indent=4)

print("Dati per RevenueChart generati e salvati in RevenueChart.json")


