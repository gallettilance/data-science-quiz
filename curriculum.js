/**
 * Course Curriculum Configuration
 * 
 * Define the order of topics and their associated YouTube videos.
 * The course progresses through these topics in order.
 * 
 * To add/modify:
 * 1. Add the YouTube video ID (the part after v= in the URL)
 * 2. Match the topic name EXACTLY to topics in questions.js
 */

const CURRICULUM = [
    {
        id: 1,
        topic: "Correlation",
        title: "Understanding Correlation",
        description: "Learn about correlation coefficients, their properties, and common pitfalls.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 2,
        topic: "Distance Functions",
        title: "Distance & Similarity Metrics",
        description: "Explore L1, L2, cosine similarity, Jaccard distance, and when to use each.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 3,
        topic: "K-Means",
        title: "K-Means Clustering",
        description: "Master Lloyd's algorithm, K-means++ initialization, and convergence properties.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 4,
        topic: "Hierarchical Clustering",
        title: "Hierarchical Clustering",
        description: "Understand dendrograms, linkage functions, and agglomerative vs divisive approaches.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 5,
        topic: "DBSCAN",
        title: "DBSCAN Clustering",
        description: "Learn density-based clustering with epsilon neighborhoods and core points.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 6,
        topic: "GMM",
        title: "Gaussian Mixture Models",
        description: "Dive into soft clustering with EM algorithm and probability distributions.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 7,
        topic: "Clustering Evaluation",
        title: "Evaluating Clusters",
        description: "Measure cluster quality with silhouette scores and disagreement distance.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 8,
        topic: "SVD",
        title: "Singular Value Decomposition",
        description: "Understand dimensionality reduction, PCA, and matrix approximation.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 9,
        topic: "KNN",
        title: "K-Nearest Neighbors",
        description: "Learn lazy learning, the importance of K, and feature scaling.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 10,
        topic: "Decision Trees",
        title: "Decision Trees",
        description: "Master GINI impurity, information gain, and tree construction.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 11,
        topic: "Naive Bayes",
        title: "Naive Bayes Classification",
        description: "Apply Bayes' theorem with the naive independence assumption.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 12,
        topic: "SVM",
        title: "Support Vector Machines",
        description: "Understand maximum margin classifiers, support vectors, and kernels.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 13,
        topic: "Linear Regression",
        title: "Linear Regression",
        description: "Learn OLS, assumptions, and interpreting coefficients.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 14,
        topic: "Logistic Regression",
        title: "Logistic Regression",
        description: "Model probabilities with the sigmoid function and maximum likelihood.",
        videoId: "smLdMzVlmyU",
    },
    {
        id: 15,
        topic: "Hypothesis Testing",
        title: "Hypothesis Testing",
        description: "Understand p-values, confidence intervals, and statistical significance.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 16,
        topic: "Neural Networks",
        title: "Neural Networks",
        description: "Explore activation functions, backpropagation, and deep learning basics.",
        videoId: "6pj33ZAtWK8",
    },
    {
        id: 17,
        topic: "General Modeling",
        title: "Model Selection & Evaluation",
        description: "Learn cross-validation, overfitting, ensemble methods, and metrics.",
        videoId: "YOUR_VIDEO_ID_HERE",
    },
    {
        id: 18,
        topic: "Classification",
        title: "Classification Fundamentals",
        description: "Understand the classification task, evaluation metrics, and common pitfalls.",
        videoId: "YOUR_VIDEO_ID_HERE",
    }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.CURRICULUM = CURRICULUM;
}

