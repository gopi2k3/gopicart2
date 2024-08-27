export class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // Handle keyword search
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i', // case-insensitive
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Remove fields that should not be included in the query
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach(field => delete queryCopy[field]);

        // Handle price range filters
        let queryStr = JSON.stringify(queryCopy);

        // Replace logical operators with MongoDB operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // Parse JSON string back to an object
        const parsedQuery = JSON.parse(queryStr);

        // Apply the filter to the query
        this.query = this.query.find(parsedQuery);
        return this;
    }

    paginate(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}
