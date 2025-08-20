// Color mapping for consistent styling
export const getColorClasses = (color) => {
    const colorMap = {
        blue: { border: "border-blue-500", text: "text-blue-500", bg: "bg-blue-100", textBg: "text-blue-800" },
        red: { border: "border-red-500", text: "text-red-500", bg: "bg-red-100", textBg: "text-red-800" },
        green: { border: "border-green-500", text: "text-green-500", bg: "bg-green-100", textBg: "text-green-800" },
        yellow: { border: "border-yellow-500", text: "text-yellow-500", bg: "bg-yellow-100", textBg: "text-yellow-800" },
        purple: { border: "border-purple-500", text: "text-purple-500", bg: "bg-purple-100", textBg: "text-purple-800" },
        orange: { border: "border-orange-500", text: "text-orange-500", bg: "bg-orange-100", textBg: "text-orange-800" },
        indigo: { border: "border-indigo-500", text: "text-indigo-500", bg: "bg-indigo-100", textBg: "text-indigo-800" },
        gray: { border: "border-gray-500", text: "text-gray-500", bg: "bg-gray-100", textBg: "text-gray-800" }
    };
    return colorMap[color] || colorMap.blue;
};

// Utility function to safely render content
export const safeRender = (item) => {
    if (typeof item === "string") {
        return item;
    }
    if (typeof item === "object" && item !== null) {
        if (item.type && item.difficulty) return `${item.type}: ${item.difficulty}`;
        if (item.task) return item.task;
        if (item.action) return item.action;
        if (item.phase && item.duration) return `${item.phase} - ${item.duration}`;
        if (item.intent && item.pageType) return `${item.intent} - ${item.pageType}`;
        if (item.priority && item.action) return item.action;
        const values = Object.values(item).filter((val) => val && typeof val === "string");
        return values.length > 0 ? values.join(" - ") : "N/A";
    }
    return "N/A";
};
