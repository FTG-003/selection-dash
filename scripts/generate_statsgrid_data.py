
import pandas as pd
import json

df = pd.read_json("/workspace/public/mocks/simulated_data.json")

# Calcola le metriche per il periodo corrente (es. ultimo mese)
current_month_data = df[df["Date"] >= (pd.to_datetime(df["Date"]).max() - pd.DateOffset(months=1)).strftime("%Y-%m-%d")]
current_eqi_avg = current_month_data["EQI"].mean()
current_rc_avg = current_month_data["RC"].mean()
current_cdi_avg = current_month_data["CDI"].mean()
current_sr_avg = current_month_data["SR"].mean()

# Calcola le metriche per il periodo precedente (es. mese precedente)
previous_month_data = df[df["Date"] < (pd.to_datetime(df["Date"]).max() - pd.DateOffset(months=1)).strftime("%Y-%m-%d")]
previous_month_data = previous_month_data[previous_month_data["Date"] >= (pd.to_datetime(previous_month_data["Date"]).max() - pd.DateOffset(months=1)).strftime("%Y-%m-%d")]

previous_eqi_avg = previous_month_data["EQI"].mean()
previous_rc_avg = previous_month_data["RC"].mean()
previous_cdi_avg = previous_month_data["CDI"].mean()
previous_sr_avg = previous_month_data["SR"].mean()

# Calcola la variazione percentuale
def calculate_change(current, previous):
    if pd.isna(previous) or previous == 0: # Handle division by zero or NaN
        return 0
    return ((current - previous) / previous) * 100

eqi_change = calculate_change(current_eqi_avg, previous_eqi_avg)
rc_change = calculate_change(current_rc_avg, previous_rc_avg)
cdi_change = calculate_change(current_cdi_avg, previous_cdi_avg)
sr_change = calculate_change(current_sr_avg, previous_sr_avg)

stats_data = {
    "data": [
        {
            "title": "EQI Medio",
            "value": f"{current_eqi_avg:.2f}",
            "diff": f"{eqi_change:.2f}"
        },
        {
            "title": "RC Medio",
            "value": f"{current_rc_avg:.2f}",
            "diff": f"{rc_change:.2f}"
        },
        {
            "title": "CDI Medio",
            "value": f"{current_cdi_avg:.2f}",
            "diff": f"{cdi_change:.2f}"
        },
        {
            "title": "SR Media",
            "value": f"{current_sr_avg:.2f}",
            "diff": f"{sr_change:.2f}"
        }
    ]
}

with open("/workspace/public/mocks/StatsGrid.json", "w") as f:
    json.dump(stats_data, f, indent=4)

print("Dati per StatsGrid generati e salvati in StatsGrid.json")


