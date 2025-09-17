
import pandas as pd
import json

df = pd.read_json("/workspace/public/mocks/simulated_data.json")

# Conta le occorrenze di ogni tipo di reciprocità
reciprocity_counts = df["ReciprocityType"].value_counts().reset_index()
reciprocity_counts.columns = ["label", "value"]

sales_chart_data = {
    "series": reciprocity_counts["value"].tolist(),
    "labels": reciprocity_counts["label"].tolist()
}

with open("/workspace/public/mocks/SalesChart.json", "w") as f:
    json.dump(sales_chart_data, f, indent=4)

print("Dati per SalesChart generati e salvati in SalesChart.json")


