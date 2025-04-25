export interface EEGDataPoint {
  timestamp: string;
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
}

/**
 * Processes raw EEG data by averaging electrode readings for each frequency band
 * @param csvText Raw CSV content
 * @returns Array of processed EEG data points
 */
export function processEEGData(csvText: string): EEGDataPoint[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');

  // Skip header and any empty lines
  const dataLines = lines.slice(1).filter(line => line.trim());

  return dataLines.map(line => {
    const values = line.split(',');
    const timestamp = values[0];

    // Extract electrode readings for each band
    const deltaReadings = [
      parseFloat(values[headers.indexOf('Delta_TP9')] || '0'),
      parseFloat(values[headers.indexOf('Delta_AF7')] || '0'),
      parseFloat(values[headers.indexOf('Delta_AF8')] || '0'),
      parseFloat(values[headers.indexOf('Delta_TP10')] || '0'),
    ].filter(val => !isNaN(val));

    const thetaReadings = [
      parseFloat(values[headers.indexOf('Theta_TP9')] || '0'),
      parseFloat(values[headers.indexOf('Theta_AF7')] || '0'),
      parseFloat(values[headers.indexOf('Theta_AF8')] || '0'),
      parseFloat(values[headers.indexOf('Theta_TP10')] || '0'),
    ].filter(val => !isNaN(val));

    const alphaReadings = [
      parseFloat(values[headers.indexOf('Alpha_TP9')] || '0'),
      parseFloat(values[headers.indexOf('Alpha_AF7')] || '0'),
      parseFloat(values[headers.indexOf('Alpha_AF8')] || '0'),
      parseFloat(values[headers.indexOf('Alpha_TP10')] || '0'),
    ].filter(val => !isNaN(val));

    const betaReadings = [
      parseFloat(values[headers.indexOf('Beta_TP9')] || '0'),
      parseFloat(values[headers.indexOf('Beta_AF7')] || '0'),
      parseFloat(values[headers.indexOf('Beta_AF8')] || '0'),
      parseFloat(values[headers.indexOf('Beta_TP10')] || '0'),
    ].filter(val => !isNaN(val));

    const gammaReadings = [
      parseFloat(values[headers.indexOf('Gamma_TP9')] || '0'),
      parseFloat(values[headers.indexOf('Gamma_AF7')] || '0'),
      parseFloat(values[headers.indexOf('Gamma_AF8')] || '0'),
      parseFloat(values[headers.indexOf('Gamma_TP10')] || '0'),
    ].filter(val => !isNaN(val));

    // Calculate averages, handling potential empty arrays
    const calculateAverage = (readings: number[]) =>
      readings.length > 0
        ? readings.reduce((a, b) => a + b) / readings.length
        : 0;

    return {
      timestamp,
      delta: calculateAverage(deltaReadings),
      theta: calculateAverage(thetaReadings),
      alpha: calculateAverage(alphaReadings),
      beta: calculateAverage(betaReadings),
      gamma: calculateAverage(gammaReadings),
    };
  });
}
