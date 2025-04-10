let apiUsageCounter = 0;

export const incrementApiUsage = () => {
    apiUsageCounter++;
    console.log(`Total API usage: ${apiUsageCounter}`);
};

export const getApiUsage = () => {
    return apiUsageCounter;
};
