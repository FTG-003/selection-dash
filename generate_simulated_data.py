
import pandas as pd
import numpy as np
import datetime

# Funzione per generare dati simulati
def generate_data(num_entries=1000):
    data = []
    start_date = datetime.date(2024, 1, 1)

    for i in range(num_entries):
        date = start_date + datetime.timedelta(days=i % 365) # Simula un anno di dati
        
        # Metriche principali
        eqi = np.random.uniform(0.5, 0.95) # Epistemic Quality Index
        rc = np.random.uniform(0.3, 0.8) # Reciprocity Coefficient
        cdi = np.random.uniform(0.1, 0.6) # Cognitive Diversity Index
        sr = np.random.uniform(0.6, 0.9) # System Resilience

        # Fasi sperimentali (simulazione)
        phase = np.random.choice(['Preparation', 'Implementation', 'Analysis and Scaling'])

        # Tipi di reciprocità
        reciprocity_type = np.random.choice(['Narrative Guided', 'Collaborative Exchange', 'Constructive Conflict'])

        # Gruppi di partecipanti (simulazione)
        group = np.random.choice(['Group A', 'Group B', 'Group C'])

        data.append({
            'Date': date.isoformat(),
            'EQI': eqi,
            'RC': rc,
            'CDI': cdi,
            'SR': sr,
            'Phase': phase,
            'ReciprocityType': reciprocity_type,
            'Group': group
        })

    df = pd.DataFrame(data)
    return df

# Genera i dati
df_simulated = generate_data(num_entries=1000)

# Salva come CSV
df_simulated.to_csv('/home/ubuntu/simulated_data.csv', index=False)

# Salva come JSON
df_simulated.to_json('/home/ubuntu/simulated_data.json', orient='records', indent=4)

print('Dati simulati generati e salvati in simulated_data.csv e simulated_data.json')


