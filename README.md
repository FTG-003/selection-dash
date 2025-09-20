# Pyragogy Analytics Dashboard

A modern analytics dashboard for visualizing Pyragogy research data, built with Next.js 14 and Mantine UI.

## 🚀 Features

- **Interactive Dashboard**: Real-time metrics visualization with EQI, RC, CDI, and SR indicators
- **Raw Data Explorer**: Advanced table with filtering, sorting, and search capabilities  
- **Research Integration**: Direct access to the foundational thesis and research materials
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface built with Mantine components

## 📊 Key Metrics

- **EQI (Epistemic Quality Index)**: Measures the quality of epistemic ideas
- **RC (Reciprocation Coefficient)**: Tracks collaborative exchange effectiveness
- **CDI (Cognitive Diversity Index)**: Quantifies perspective diversity
- **SR (System Resilience)**: Assesses adaptive capacity

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Mantine 7
- **Charts**: ApexCharts
- **Language**: TypeScript
- **Styling**: CSS Modules + Mantine
- **Data**: JSON mock data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pyragogy-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard homepage
│   ├── raw-data/          # Raw data table page
│   └── thesis/            # Research thesis page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── charts/            # Chart components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── data/                  # Constants and static data
└── styles/                # Global styles
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Theme**: Modify `src/lib/theme.ts` for custom colors and styling
- **Data**: Update JSON files in `public/mocks/` for different datasets
- **Navigation**: Edit `src/data/sidebar-links.ts` for menu customization

## 📈 Data Format

The dashboard expects JSON data in the following format:

```json
{
  "Date": "2024-01-01",
  "EQI": 0.85,
  "RC": 0.72,
  "CDI": 0.43,
  "SR": 0.91,
  "Phase": "Implementation",
  "ReciprocityType": "Collaborative Exchange",
  "Group": "Group A"
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Static Export (Optional)
```bash
npm run build
```

## 📚 Research Context

This dashboard visualizes data from the research thesis:
**"Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength"**
by Fabrizio Terzi (Pyragogy.org)

The work introduces evolutionary peer-to-peer pedagogy concepts and metrics for measuring collaborative learning effectiveness.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Research Organization**: [Pyragogy.org](https://pyragogy.org)
- **Thesis DOI**: 10.5281/zenodo.16961291
- **Author ORCID**: 0009-0004-7191-0455

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript configuration in `tsconfig.json`

2. **Charts not rendering**
   - Verify ApexCharts is installed: `npm list react-apexcharts`
   - Check browser console for JavaScript errors

3. **Data not loading**
   - Confirm JSON files exist in `public/mocks/`
   - Check network tab for failed requests

### Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the research thesis for context

---

Built with ❤️ for advancing collaborative education through data-driven insights.