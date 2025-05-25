/**
 * Calculates the moving average for a data series
 * @param {Array} data - Data array
 * @param {number} window - Window size
 * @returns {Array} - Array with moving averages
 */
const getMovingAverage = (data, window) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - window + 1);
        const values = data.slice(start, i + 1);
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        result.push(average);
    }
    return result;
};

/**
 * Calculates the percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} - Percentage change
 */
const getPercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
};

/**
 * Determines the trend based on percentage change
 * @param {number} change - Percentage change
 * @returns {string} - 'ascending' | 'descending' | 'stable'
 */
const getTrend = (change) => {
    if (change > 1) return 'ascending';
    if (change < -1) return 'descending';
    return 'stable';
};

/**
 * Calculates basic statistics for a dataset
 * @param {Array} data - Data array
 * @returns {Object} - Statistics (max, min, avg)
 */
const getBasicStatistics = (data) => {
    if (!data.length) return { max: 0, min: 0, avg: 0 };
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    
    return { max, min, avg };
};

/**
 * Calculates the correlation coefficient between two data series
 * @param {Array} x - First data series
 * @param {Array} y - Second data series
 * @returns {number} - Correlation coefficient
 */
const getCorrelation = (x, y) => {
    if (x.length !== y.length) return 0;
    
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
};

module.exports = {
    getMovingAverage,
    getPercentageChange,
    getTrend,
    getBasicStatistics,
    getCorrelation
}; 