/**
 * Data Science Quiz - Question Database
 * 
 * HOW TO ADD A QUESTION:
 * {
 *     topic: "Topic Name",
 *     question: "Your question text. LaTeX: $x^2$ or $$\\sum_{i=1}^n$$",
 *     answer: "The correct answer",
 *     alternatives: ["Wrong 1", "Wrong 2", "Wrong 3"],
 *     explanation: "Why the answer is correct.",
 *     image: "images/example.png"  // Optional
 * },
 */

const QUESTIONS = [
    // ==========================================
    // CORRELATION
    // ==========================================
    {
        topic: "Correlation",
        question: "What is the correlation coefficient of these two variables?",
        answer: "1",
        alternatives: ["-1", "1/2", "0", "-1/2"],
        explanation: "The scatter plot shows a perfect positive linear relationship, indicating a correlation of 1.",
        image: "images/correlation/1.png"
    },
    {
        topic: "Correlation",
        question: "What is the correlation coefficient of these two variables?",
        answer: "0",
        alternatives: ["1", "1/2", "-1/2", "-1"],
        explanation: "The scatter plot shows a flat line, indicating no linear relationship between the variables. Technically, the correlation coefficient is undefined, but it is commonly treated as 0 in practice.",
        image: "images/correlation/2.png"
    },
    {
        topic: "Correlation",
        question: "What is the correlation coefficient of these two variables?",
        answer: "0",
        alternatives: ["1", "0", "-1/2", "-1"],
        explanation: "The scatter plot shows a perfect circle, indicating no linear relationship between the variables in any direction.",
        image: "images/correlation/3.png"
    },
    {
        topic: "Correlation",
        question: "The correlation coefficient of $y = \\sin x$ for $x \\in \\left[0, 3\\pi \\right]$ is:",
        answer: "0",
        alternatives: ["1", "1/2", "-1/2", "-1"],
        explanation: "Over the interval $[0, 3\\pi]$, sine completes 1.5 full cycles. The positive and negative portions cancel out, resulting in no overall linear correlation between x and y."
    },
    {
        topic: "Correlation",
        question: "Suppose we have a simple noisy relationship $Y = X + \\text{noise}$ where the noise is drawn from a normal distribution with mean 0 and standard deviation $\\sigma$. True or False: The effect of the noise on the correlation also depends on the standard deviation of $Y$.",
        answer: "False because the variance of $Y$ is not another factor since $\\mathrm{Var}(Y) = \\mathrm{Var}(X) + \\mathrm{Var}(\\text{noise})$.",
        alternatives: ["True because the correlation formula includes both $\\sigma_X$ and $\\sigma_Y$, changes in the variability of $Y$ directly affect the correlation."],
        explanation: "The variance of Y is determined by X and the noise, so it's not an independent factor. The correlation depends on Var(X) and Var(noise), and Var(Y) is just the sum of these."
    },
    {
        topic: "Correlation",
        question: "The correlation coefficient of a dataset with only two points is always either 1, 0, or -1.",
        answer: "True",
        alternatives: ["False"],
        explanation: "With exactly two distinct points, you can always draw a perfect line through them, so the correlation is either +1, 0, or -1."
    },
    {
        topic: "Correlation",
        question: "The correlation coefficient is a similarity function.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Correlation coefficient measures how similarly two variables move together. It's very closely related to cosine similarity."
    },
    {
        topic: "Correlation",
        question: "$X$ and $Y$ form a perfect line and have a correlation coefficient of -1. After reflecting $Y$ on the x-axis, the correlation coefficient is:",
        answer: "1",
        alternatives: ["-1", "impossible to tell"],
        explanation: "Reflecting Y on the x-axis negates all Y values. If the original correlation was -1 (perfect negative), after reflection it becomes +1 (perfect positive)."
    },
    {
        topic: "Correlation",
        question: "Is it possible to have 3 features $X, Y, Z$ such that $X$ and $Y$ have correlation 0, $Y$ and $Z$ have correlation 0, but $X$ and $Z$ have correlation $\\neq 0$?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "Yes, this is possible. For example: X = cos(t), Y = sin(t), Z = cos(t). X and Y have correlation 0, Y and Z have correlation 0, but X and Z have correlation 1."
    },
    {
        topic: "Correlation",
        question: "True or False: Normalizing (or standardizing) both variables changes their correlation coefficient.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Correlation is scale-invariant. Standardizing (subtracting mean and dividing by standard deviation) does not change the correlation coefficient."
    },
    {
        topic: "Correlation",
        question: "The correlation coefficient of a dataset with an odd number of points cannot be 0.",
        answer: "False",
        alternatives: ["True"],
        explanation: "A dataset with an odd number of points can have zero correlation. For example: (-1,1), (0,0), (1,1) has correlation 0."
    },
    {
        topic: "Correlation",
        question: "X and Y have correlation coefficient r. Suppose you double all values of X. What happens to r?",
        answer: "r is unchanged",
        alternatives: ["r is doubled", "r is halved"],
        explanation: "Correlation is scale-invariant. Multiplying X by any positive constant doesn't change the correlation coefficient."
    },
    {
        topic: "Correlation",
        question: "X and Y have correlation coefficient r. Suppose you add 100 to all values of X. What happens to r?",
        answer: "r is unchanged",
        alternatives: ["r is doubled", "r is halved"],
        explanation: "Correlation is translation-invariant. Adding a constant to X doesn't change the correlation coefficient."
    },
    {
        topic: "Correlation",
        question: "You collect data about temperature and ice cream sales every day for weeks and notice a positive correlation. It must be true that the correlation between the weekly average temperature and the weekly average ice cream sales is also positive.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Aggregating data does not necessarily preserve the direction of correlation: see Simpson's Paradox."
    },
    {
        topic: "Correlation",
        question: "$x$, $y$, and $z$ are features. The correlation between $x$ and $y$ is equal to that of $y$ and $z$ and equal to $x$ and $z$. Can this correlation be $-1$?",
        answer: "False",
        alternatives: ["True"],
        explanation: "If corr(x,y) = corr(y,z) = corr(x,z) = -1, the correlation matrix would not be positive semi-definite, which is impossible."
    },
    {
        topic: "Correlation",
        question: "$x$, $y$, and $z$ are features. The correlation between $x$ and $y$ is equal to that of $y$ and $z$ and equal to $x$ and $z$. The maximum correlation is $1$.",
        answer: "True",
        alternatives: ["False"],
        explanation: "When all three pairwise correlations are equal to 1, all variables are perfectly linearly related (essentially the same variable up to scaling)."
    },
    {
        topic: "Correlation",
        question: "$x$, $y$, and $z$ are features. The correlation between $x$ and $y$ is equal to that of $y$ and $z$ and equal to $x$ and $z$. The minimum correlation it can be is $-1$.",
        answer: "False",
        alternatives: ["True"],
        explanation: "The minimum equal correlation for 3 variables is $-1/2$, not $-1$. This is due to the positive semi-definiteness constraint of correlation matrices."
    },
    {
        topic: "Correlation",
        question: "$x$, $y$, and $z$ are features. The correlation between $x$ and $y$ is equal to that of $y$ and $z$ and equal to $x$ and $z$. What is the minimum correlation it can be?",
        answer: "-1/2",
        alternatives: ["-1", "0", "1/2", "1"],
        explanation: "For a valid correlation matrix with equal off-diagonal elements r, we need $1 + 2r \\geq 0$, so $r \\geq -1/2$."
    },
    {
        topic: "Correlation",
        question: "In linear regression between two vectors X and Y with an intercept, the $R^2$ value is the square of the correlation coefficient between X and Y.",
        answer: "True",
        alternatives: ["False"],
        explanation: "For simple linear regression with an intercept, $R^2 = r^2$ where r is the Pearson correlation coefficient between X and Y. This relationship holds specifically for bivariate regression."
    },
    {
        topic: "Correlation",
        question: "If x and y have correlation coefficient r, then the correlation coefficient between x and 2y is 2r.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Correlation is scale-invariant. Multiplying y by any positive constant doesn't change the correlation. The correlation between x and 2y is still r, not 2r."
    },
    // ==========================================
    // DISTANCE AND SIMILARITY
    // ==========================================
    {
        topic: "Distance Functions",
        question: "The area of a triangle where the L2 lengths of the sides are 1, 1, 2 is:",
        answer: "0",
        alternatives: ["1/2", "impossible to tell"],
        explanation: "If two sides have length 1 and the third has length 2, the points are collinear, so the area is 0."
    },
    {
        topic: "Distance Functions",
        question: "The same triangle cannot be equilateral (all sides equal length) under both L1 and L2.",
        answer: "True",
        alternatives: ["False"],
        explanation: "L1 and L2 metrics define distance differently. A triangle equilateral under L2 won't be equilateral under L1 because rotations preserve L2 distances but not L1 distances."
    },
    {
        topic: "Distance Functions",
        question: "All rotations preserve the L2 lengths of the sides or a triangle. Not all rotations preserve the L1 lengths of the sides of a triangle.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Euclidean (L2) distance is rotation-invariant, but Manhattan (L1) distance is not. Rotating a shape changes its L1 distances."
    },
    {
        topic: "Distance Functions",
        question: "Reflecting a triangle around the x-axis or y-axis preserves both the L1 and L2 lengths of its sides.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Both L1 and L2 distances are preserved under reflection because the absolute differences in coordinates remain the same."
    },
    {
        topic: "Distance Functions",
        question: "The L1 shortest path between A and B is only unique if its length is the same as the L2 distance between A and B.",
        answer: "True",
        alternatives: ["False"],
        explanation: "When L1 = L2 distance, the points differ in only one coordinate, so there's only one L1 path. Otherwise, there are multiple L1 shortest paths."
    },
    {
        topic: "Distance Functions",
        question: "All Lp unit circles for $p \\geq 1$ have the same perimeter when measured with L1.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Different Lp unit circles have different shapes and thus different L1 perimeters. The L1 unit circle is a diamond, L2 is a circle, etc."
    },
    {
        topic: "Distance Functions",
        question: "The Manhattan distance is always less than or equal to the Euclidean distance between two points in a 2D space.",
        answer: "False",
        alternatives: ["True"],
        explanation: "The Manhattan distance is always greater than or equal to the Euclidean distance: $|x_1-x_2| + |y_1-y_2| \\geq \\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$."
    },
    {
        topic: "Distance Functions",
        question: "A distance function can be negative.",
        answer: "False",
        alternatives: ["True"],
        explanation: "By definition, a distance function (metric) must satisfy non-negativity: $d(x,y) \\geq 0$ for all x, y."
    },
    // {
    //     topic: "Distance Functions",
    //     question: "Which of the following is a unit circle created using a dissimilarity function that is not a distance function?",
    //     answer: "C",
    //     alternatives: ["A", "B"],
    //     explanation: "Option C shows a non-convex shape which violates the triangle inequality, making it a dissimilarity but not a proper distance metric.",
    //     image: "images/distance&similarity/p1:2.png"
    // },
    {
        topic: "Distance Functions",
        question: "You are designing a network of 100 water pumps. You have X units of pumping power to distribute. Design A performance depends on $\\ell_1$ norm, Design B on $\\ell_2$ norm. Which design pushes you to concentrate power in one pump?",
        answer: "$\\ell_2$ favors concentrating power in one pump",
        alternatives: ["Both designs favor concentrating power in one pump", "$\\ell_1$ favors concentrating power in one pump"],
        explanation: "To maximize $\\ell_2$ norm with fixed $\\ell_1$ sum, concentrate all power in one pump. $\\ell_1$ norm is the same regardless of distribution (it equals X), but $\\ell_2$ is maximized when power is concentrated."
    },
    {
        topic: "Distance Functions",
        question: "What is the Jaccard distance between two completely different documents (i.e. no words in common at all)?",
        answer: "1",
        alternatives: ["-1", "0", "depends on the size of the documents"],
        explanation: "Jaccard distance = 1 - Jaccard similarity. With no overlap, Jaccard similarity = 0, so Jaccard distance = 1."
    },
    // {
    //     topic: "Distance Functions",
    //     question: "If x and y are sets of words represented as presence/absence vectors, the L1 distance between these vectors is just the Jaccard distance multiplied by the size of the union x ∪ y.",
    //     answer: "False",
    //     alternatives: ["True"],
    //     explanation: "L1 distance counts the symmetric difference (elements in exactly one set), while Jaccard distance = |symmetric difference| / |union|. They're related but not by simple multiplication."
    // },
    {
        topic: "Distance Functions",
        question: "To improve ChatGPT, researchers evaluate responses using cosine similarity with pre-written answers. What could go wrong?",
        answer: "Short responses can score nearly the same as long, detailed responses",
        alternatives: ["Nothing, cosine similarity is perfectly suited for this task", "This won't work because cosine similarity only works on vectors of the same length"],
        explanation: "Cosine similarity measures angle, not magnitude. A short response with the right keywords can score similarly to a comprehensive answer."
    },
    {
        topic: "Distance Functions",
        question: "As p gets closer to $\\infty$ in the Minkowski / Lp distance, the largest difference between coordinates will completely overshadow other smaller differences. So when $p = \\infty$ the Minkowski distance is simply defined by the maximum coordinate difference.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The Chebyshev distance ($L_\\infty$) equals the maximum absolute coordinate difference: $\\lim_{p\\to\\infty} ||x-y||_p = \\max_i |x_i - y_i|$."
    },
    {
        topic: "Distance Functions",
        question: "In $n$-dimensional space, the Minkowski / Lp distance for all values of p are equal for which set of points?",
        answer: "Points where all coordinates are the same except one.",
        alternatives: ["Points where all coordinates are zero except one.", "Points where all coordinates are different except one.", "Points where all coordinates are non-zero except one."],
        explanation: "When points differ in only one coordinate, $L_p = |\\Delta|^{1/p \\cdot p} = |\\Delta|$ for all p, where $\\Delta$ is the difference in that coordinate."
    },
    {
        topic: "Distance Functions",
        question: "A distance function is always non-negative.",
        answer: "True",
        alternatives: ["False"],
        explanation: "A distance function is always non-negative by definition."
    },
    {
        topic: "Distance Functions",
        question: "Are the following values in this matrix created by a distance function?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "A valid distance function must satisfy the triangle inequality. But d(A, B) = √2, d(B, E) = 2, d(A, E) = 5 > d(A, B) + d(B, E) = √2 + 2 = 3.414. So it is not a valid distance function.",
        image: "images/distance/1.png"
    },
    {
        topic: "Distance Functions",
        question: "In $n$-dimensional space, the Manhattan distance ($L_1$) equals the Euclidean distance ($L_2$) for which set of points?",
        answer: "Points where all coordinates are the same except one.",
        alternatives: ["Points where all coordinates are zero except one.", "Points where all coordinates are different except one.", "Points where all coordinates are non-zero except one."],
        explanation: "When only one coordinate differs by amount d, both L1 and L2 distance equal |d|."
    },
    {
        topic: "Distance Functions",
        question: "Consider points $A = (1, 2)$ and $B = (4, 6)$. For which is the distance invariant to scaling both coordinates by the same factor?",
        answer: "Cosine distance ($1 - \\text{cosine similarity}$)",
        alternatives: ["Manhattan and Euclidean distances", "Chebyshev distance (when $p = \\infty$)", "All of the above"],
        explanation: "Cosine similarity depends only on the angle between vectors, not their magnitudes. Manhattan, Euclidean, and Chebyshev all scale with the coordinates."
    },
    // ==========================================
    // K-MEANS CLUSTERING
    // ==========================================
    {
        topic: "K-Means",
        question: "K-means can, with poor initialization, never actually converge.",
        answer: "False",
        alternatives: ["True"],
        explanation: "K-means always converges because each step decreases or maintains the objective function, and there are finite possible assignments. Poor initialization may lead to local optima, but convergence is guaranteed."
    },
    {
        topic: "K-Means",
        question: "To find the optimal number of clusters k in K-means, we run K-means multiple times for different values of k and pick the one with the lowest cost (sum of squared distances from the centroids).",
        answer: "False",
        alternatives: ["True"],
        explanation: "Cost always decreases with k (k=n gives cost 0). Instead, use the elbow method or silhouette scores to find optimal k."
    },
    {
        topic: "K-Means",
        question: "Lloyd's algorithm is not optimal but by changing the initialization method we can make it optimal.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Better initialization (like K-means++) improves results but doesn't guarantee global optimum. K-means is NP-hard, so no polynomial algorithm guarantees optimality."
    },
    {
        topic: "K-Means",
        question: "Is K-means++ well suited for the following dataset?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "The dataset shows concentric rings which K-means cannot handle well because it assumes spherical clusters.",
        image: "images/kmeans/1.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "Points at the tips of the half moons would be assigned to the wrong cluster.",
        image: "images/kmeans/2.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "K-means will split a single cluster evenly.",
        image: "images/kmeans/3.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "K-means cannot find concentric clusters.",
        image: "images/kmeans/4.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "Even if the clusters aren't globular, there is no other solution in this case.",
        image: "images/kmeans/5.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "If the point is picked as an initial centroid it will likely stay alone.",
        image: "images/kmeans/6.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "There is no other solution for k=3 that is better.",
        image: "images/kmeans/7.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "K-means will split a single cluster evenly.",
        image: "images/kmeans/8.png"
    },
    {
        topic: "K-Means",
        question: "Is the following a possible output from K-means++ clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "If the two first centroids are chosen as points in the top cluster, it will be split into two clusters.",
        image: "images/kmeans/9.png"
    },
    {
        topic: "K-Means",
        question: "You transform a dataset into $z = (x - \\bar{x})^2 + (y - \\bar{y})^2$. Would K-means be able to identify 3 concentric clusters in this new 1-dimensional space?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "This transformation converts concentric rings to intervals on a line based on distance from center. K-means can then separate these 1D intervals."
    },
    {
        topic: "K-Means",
        question: "Consider the 1D dataset: [-2, -1, 0, 5, 6, 7, x]. With k=2, what is the smallest value of x beyond which x will always be alone in its own cluster?",
        answer: "26",
        alternatives: ["Never", "20.5", "30.5", "36"],
        explanation: "Let's say we start with [-2, -1, 0] as one cluster and [5, 6, 7, x] as the other. For x to be alone, 5 must move over to the first cluster, then 6 and 7. For this to happen, the mean of the first cluster must be closer to 5 than the mean of the second cluster. $\frac{5 + 6 + 7 + x}{4} - 5 > -1 - 5$ give x > 26"
    },
    {
        topic: "K-Means",
        question: "Dataset: [-2, -1.5, .5, 1, 5.5, 6, 7.5]. With initial centroids 0 and 2, what are the final centroids?",
        answer: "-.5 and 6",
        alternatives: ["0 and 3.25", "1 and 5.5", "0 and 6"],
        explanation: "After convergence, one cluster contains [-2, -1.5, .5, 1] with mean ≈ -0.5, and the other contains [5.5, 6, 7.5] with mean ≈ 6.33."
    },
    {
        topic: "K-Means",
        question: "The only difference between K-means and K-means++ is the initialization method.",
        answer: "True",
        alternatives: ["False"],
        explanation: "K-means++ differs only in how initial centroids are chosen (probabilistic based on distance). The rest of Lloyd's algorithm remains the same."
    },
    {
        topic: "K-Means",
        question: "For dataset X with N points, when k=N in K-means, the total cost is:",
        answer: "0",
        alternatives: ["1", "N", "N * variance(X)"],
        explanation: "When k equals the number of points N, each point is its own cluster with itself as the centroid. The distance from each point to its centroid is 0, so total cost is 0."
    },
    {
        topic: "K-Means",
        question: "For dataset X with N points, when k=1 in K-means, the total cost is:",
        answer: "N * variance(X)",
        alternatives: ["0", "1", "N"],
        explanation: "With k=1, the single centroid is the mean of all points. The total cost equals the sum of squared distances to the mean, which is N times the variance."
    },
    {
        topic: "K-Means",
        question: "Consider the 1-dimensional dataset: [0, 5, x]. With k=2, what is the smallest value of x (x > 5) beyond which x will always be alone in its own cluster no matter the initialization?",
        answer: "15",
        alternatives: ["7.5", "10", "12.5"],
        explanation: "For x to always be alone, even when grouped with 5, the centroid of {5, x} must be farther from 5 than 5 is from 0. This requires (5+x)/2 - 5 > 5, giving x > 15."
    },
    {
        topic: "K-Means",
        question: "Dataset: [0, .5, 1.5, 2, 6, 6.5, 7]. With initial centroids 0 and 2, what are the final centroids?",
        answer: "1 and 6.5",
        alternatives: [".5 and 1.5", "1.5 and 6", "4"],
        explanation: "The algorithm converges with clusters [0, .5, 1.5, 2] (mean=1) and [6, 6.5, 7] (mean≈6.5)."
    },
    {
        topic: "K-Means",
        question: "Lloyd's algorithm always converges.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Lloyd's algorithm always converges because: (1) the objective decreases or stays same each step, (2) there are finite possible assignments, (3) it cannot cycle."
    },
    {
        topic: "K-Means",
        question: "At each step in Lloyd's algorithm, if the cluster assignment changes, then the sum of the variances of each cluster becomes smaller.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Each reassignment to a closer centroid reduces within-cluster variance. The objective function (sum of squared distances) decreases monotonically."
    },
    {
        topic: "K-Means",
        question: "The difference between K-means and K-means++ is that K-means++ is faster, hence the name 'plus plus'.",
        answer: "False",
        alternatives: ["True"],
        explanation: "K-means++ has smarter initialization (spreading initial centroids), not faster runtime. The '++' refers to the improved initialization procedure."
    },
    {
        topic: "K-Means",
        question: "If we change the distance function in K-means to be the Manhattan distance, the center of each cluster is no longer the mean but the median of the cluster.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The median minimizes sum of absolute deviations (L1), while the mean minimizes sum of squared deviations (L2). K-medians uses L1 distance."
    },
    {
        topic: "K-Means",
        question: "K-means can find these concentric circles if the dataset is tranformed into a 1-dimensional space using the formula $z = (x - \\bar{x})^2 + (y - \\bar{y})^2$.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The transformation converts the concentric circles into a 1-dimensional space where the values corresponds to the distance from the center of the circles. Which perfectly separates the clusters in 1D.",
        image: "images/kmeans/4.png"
    },
    // ==========================================
    // HIERARCHICAL CLUSTERING
    // ==========================================
    {
        topic: "Hierarchical Clustering",
        question: "Which link function would make Hierarchical clustering well suited for the following dataset?",
        answer: "Single-link distance",
        alternatives: ["Complete-link distance", "Ward's distance", "None of the above"],
        explanation: "Single-link can detect elongated, chain-like structures because it uses minimum distance. It can 'chain' through the elongated cluster.",
        image: "images/hierarchical/1.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "Which clusters get merged next if using Euclidean and Complete-link distances?",
        answer: "AB and EF",
        alternatives: ["AB and CD", "CD and EF"],
        explanation: "Complete-link uses maximum distance between clusters. AB-EF has distance √13 while AB-CD has distance √17.",
        image: "images/hierarchical/2.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and complete-link distance, what is the merging order for {A=(0,0), B=(1,1), C=(3,0), D=(0,-2)}?",
        answer: "AB → ABC → ABDC",
        alternatives: ["AB → ABD → ABCD", "AB → CD → ABCD"],
        explanation: "A and B are closest. Then under complete-link C is closer to AB with distance 3 compared to D with distance √10. Finally D joins."
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and single-link distance, what is the merging order for {A=(0,0), B=(1,1), C=(3,0), D=(0,-2)}?",
        answer: "AB → ABD → ABDC",
        alternatives: ["AB → ABC → ABCD", "AB → CD → ABCD"],
        explanation: "Single-link uses minimum distance. A-B merge first, then D (distance 2 to A), then C."
    },
    {
        topic: "Hierarchical Clustering",
        question: "How many clusters would be created by cutting the dendrogram below as shown?",
        answer: "4",
        alternatives: ["5", "6", "7"],
        explanation: "Count the number of vertical lines that cross the horizontal cut line in the dendrogram.",
        image: "images/hierarchical/3.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "How many clusters would be created by cutting the dendrogram below as shown?",
        answer: "7",
        alternatives: ["4", "6", "5"],
        explanation: "Count the number of vertical lines that cross the horizontal cut line in the dendrogram.",
        image: "images/hierarchical/4.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "How many clusters would be created by cutting the dendrogram below as shown?",
        answer: "4",
        alternatives: ["6", "7", "5"],
        explanation: "Count the number of vertical lines that cross the horizontal cut line in the dendrogram.",
        image: "images/hierarchical/5.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and complete-link distance, what is the merging order for the dataset shown?",
        answer: "EF → AB → CD → ABEF → ABCDEF",
        alternatives: ["EF → AB → CD → ABCD → ABCDEF", "EF → AB → CD → CDEF → ABCDEF"],
        explanation: "Update the distance matrix by taking the maximum distance between the new cluster and the other clusters.",
        image: "images/hierarchical/6.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and single-link distance, what is the merging order for the dataset shown?",
        answer: "EF → AB → CD → ABEF → ABCDEF",
        alternatives: ["EF → AB → CD → ABCD → ABCDEF", "EF → AB → CD → CDEF → ABCDEF"],
        explanation: "Update the distance matrix by taking the maximum distance between the new cluster and the other clusters.",
        image: "images/hierarchical/6.png"
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and complete-link distance for {A=(1,2), B=(3,5), C=(4,1), D=(7,3), E=(6,6)}, what is the merging order?",
        answer: "AC → DE → ACDE → ABCDE",
        alternatives: ["AC → ABC → DE → ABCDE", "AC → DE → BDE → ABCDE"],
        explanation: "A and C are closest, then D and E. Under complete-link, AC and DE merge, then B joins."
    },
    {
        topic: "Hierarchical Clustering",
        question: "Using Euclidean and single-link distance for {A=(1,2), B=(3,5), C=(4,1), D=(7,3), E=(6,6)}, what is the merging order?",
        answer: "AC → ABC → DE → ABCDE",
        alternatives: ["AC → DE → ACDE → ABCDE", "AC → DE → BDE → ABCDE"],
        explanation: "Under single-link: A-C merge, then B joins AC (closer minimum distance), then D-E, finally merge all."
    },
    {
        topic: "Hierarchical Clustering",
        question: "One way to divide clusters in Hierarchical Clustering's Divisive Algorithm (as opposed to agglomerative) is to use a partitional clustering method like K-means.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Divisive (top-down) clustering can use any method to split clusters. K-means with k=2 is commonly used to divide a cluster into two."
    },
    {
        topic: "Hierarchical Clustering",
        question: "Hierarchical clustering's divisive algorithm requires partitioning into 2 subsets at each step. This can be done using:",
        answer: "Kmeans/Kmeans++",
        alternatives: ["DBScan", "KNN", "None of the above"],
        explanation: "K-means with k=2 naturally partitions data into 2 groups, making it suitable for divisive hierarchical clustering. DBSCAN doesn't guarantee 2 clusters, and KNN is for classification."
    },
    {
        topic: "Hierarchical Clustering",
        question: "Consider dataset {A=(1,2), B=(3,4), C=(4,1), D=(6,7)}. The merging order is the same for single-link and complete-link distance.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The merging order is the same for single-link and complete-link distance."
    },
    // ==========================================
    // DBSCAN CLUSTERING
    // ==========================================
    {
        topic: "DBSCAN",
        question: "Keeping $\\epsilon$ the same and increasing min_pts in DBSCAN won't decrease the number of noise points.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Higher min_pts means fewer points qualify as core points (need more neighbors). More points become border or noise points."
    },
    {
        topic: "DBSCAN",
        question: "Decreasing min_pts and increasing $\\epsilon$ in DBSCAN won't increase the number of noise points.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Lower min_pts = easier to be a core point. Larger $\\epsilon$ = more neighbors. Both changes reduce noise points."
    },
    {
        topic: "DBSCAN",
        question: "In DBSCAN, some points may not be assigned to any cluster.",
        answer: "True",
        alternatives: ["False"],
        explanation: "DBSCAN considers points as noise if they don't have enough neighbors within $\\epsilon$ distance and aren't border points."
    },
    {
        topic: "DBSCAN",
        question: "Is the following a possible output from DBSCAN clustering?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "DBSCAN can find clusters of arbitrary shape based on density. This output is consistent with DBSCAN behavior.",
        image: "images/dbscan/1.png"
    },
    {
        topic: "DBSCAN",
        question: "Is DBSCAN well suited for the following dataset?",
        answer: "Yes",
        alternatives: ["No"],
        explanation: "DBSCAN can identify concentric circles is their density is high enough and they're well separated.",
        image: "images/dbscan/2.png"
    },
    {
        topic: "DBSCAN",
        question: "Is the following a possible output from DBSCAN clustering?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "DBSCAN clusters are connected through density. DBSCAN would end up connecting all points in the same cluster.",
        image: "images/dbscan/3.png"
    },
    {
        topic: "DBSCAN",
        question: "DBSCAN can find regions of different densities.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Once density is defined, DBSCAN finds clusters for that specific density. Higher density regions may be absorbed into lower density clusters. Lower density regions become noise.",
    },
    {
        topic: "DBSCAN",
        question: "DBSCAN like K-means requires you to specify the number of clusters.",
        answer: "False",
        alternatives: ["True"],
        explanation: "DBSCAN automatically determines the number of clusters based on density. You specify ε (neighborhood radius) and minPts, not the number of clusters."
    },
    // ==========================================
    // GMM (Gaussian Mixture Models)
    // ==========================================
    {
        topic: "GMM",
        question: "In GMM, what is the likelihood of the data (with N data points) when k=N?",
        answer: "$\\infty$",
        alternatives: ["$-\\infty$", "0", "1"],
        explanation: "With k=N, each point gets its own Gaussian with zero variance. The PDF at the mean is infinite, so the likelihood is infinite."
    },
    {
        topic: "GMM",
        question: "Ignoring computational precision, the Expectation Maximization Algorithm behind GMM will never decrease the likelihood of the data after an EM step.",
        answer: "True",
        alternatives: ["False"],
        explanation: "EM is guaranteed to increase (or maintain) the likelihood at each iteration. It converges to a local maximum of the likelihood function."
    },
    {
        topic: "GMM",
        question: "Since outliers most likely don't belong to any cluster, the probabilities of belonging to each cluster, assigned by a GMM, will all be small.",
        answer: "False",
        alternatives: ["True"],
        explanation: "GMM assigns probabilities that sum to 1 across clusters for each point. An outlier will have low PDF values from each Gaussian, but the normalized responsibilities still sum to 1."
    },
    {
        topic: "GMM",
        question: "The probabilities of belonging to each cluster, assigned to a given point by a GMM, must sum to 1.",
        answer: "True",
        alternatives: ["False"],
        explanation: "For each point, the responsibilities (posterior probabilities of belonging to each cluster) sum to 1. This is by definition of conditional probability."
    },
    {
        topic: "GMM",
        question: "The Expectation Maximization Algorithm behind GMM is guaranteed to converge to a global maximum after a finite number of iterations.",
        answer: "False",
        alternatives: ["True"],
        explanation: "EM converges to a local maximum, not necessarily global. The result depends on initialization."
    },
    {
        topic: "GMM",
        question: "The Expectation Maximization Algorithm behind GMM tries to find the parameters of a Normal Distribution that maximize the likelihood of the data.",
        answer: "False",
        alternatives: ["True"],
        explanation: "GMM is a mixture of Normal Distributions, so the Expectation Maximization Algorithm tries to find the parameters of the Gaussian Mixture Distribution that maximize the likelihood of the data."
    },
    {
        topic: "GMM",
        question: "How many parameters does GMM need to estimate for k clusters and 1D data?",
        answer: "3k",
        alternatives: ["k", "2k"],
        explanation: "For each of k components: 1 mean, 1 variance, 1 mixing weight. That's 3k parameters (though mixing weights have 1 constraint: sum to 1)."
    },
    {
        topic: "GMM",
        question: "One way to initialize GMM clustering is to use K-means since it also performs well when clusters are Gaussian.",
        answer: "True",
        alternatives: ["False"],
        explanation: "K-means provides good initial cluster assignments. GMM can then refine these with soft assignments and covariance estimation."
    },
    // ==========================================
    // CLUSTERING EVALUATION
    // ==========================================
    {
        topic: "Clustering Evaluation",
        question: "The maximum disagreement distance any two clusterings can have for a dataset of size $N$ is:",
        answer: "$N(N - 1) / 2$",
        alternatives: ["$N$", "$2N$", "$N^2$"],
        explanation: "Disagreement counts pairs that are together in one clustering but apart in the other. Maximum is all $\\binom{N}{2} = N(N-1)/2$ pairs disagreeing."
    },
    {
        topic: "Clustering Evaluation",
        question: "A silhouette score of a point is the scaled difference between its average distance to other points in its cluster to the minimum average distance to points in other clusters.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Silhouette = (b-a)/max(a,b), where a = avg distance within cluster, b = avg distance to nearest other cluster."
    },
    {
        topic: "Clustering Evaluation",
        question: "You repeatedly take two random partitions of a dataset and record their disagreement distance. Is the histogram of disagreements symmetric?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "The distribution is skewed. Most random partitions have high disagreement (near maximum). Perfect agreement (0) is rare."
    },
    {
        topic: "Clustering Evaluation",
        question: "A silhouette score is a distance function.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Silhouette scores range from -1 to 1 and measure cluster quality for individual points. They're not a metric between objects."
    },
    {
        topic: "Clustering Evaluation",
        question: "What is the disagreement distance between the following two clusterings?",
        answer: "28",
        alternatives: ["0", "1", "56"],
        explanation: "Count pairs that are in the same cluster in one partition but different clusters in the other.",
        image: "images/evaluation/dd.png"
    },
    {
        topic: "Clustering Evaluation",
        question: "What is the disagreement distance between the following two clusterings?",
        answer: "3",
        alternatives: ["0", "6", "10"],
        explanation: "Count disagreeing pairs between the two clusterings shown.",
        image: "images/evaluation/1.png"
    },
    {
        topic: "Clustering Evaluation",
        question: "What is the disagreement distance between the following two clusterings?",
        answer: "0",
        alternatives: ["6", "15", "30"],
        explanation: "Count disagreeing pairs between the two clusterings shown.",
        image: "images/evaluation/2.png"
    },
    {
        topic: "Clustering Evaluation",
        question: "What is the disagreement distance between the following two clusterings?",
        answer: "15",
        alternatives: ["0", "6", "30"],
        explanation: "Count disagreeing pairs between the two clusterings shown.",
        image: "images/evaluation/3.png"
    },
    // // ==========================================
    // // SVD (Singular Value Decomposition)
    // // ==========================================
    {
        topic: "SVD",
        question: "The rank-k approximation of an (n x m) matrix also has dimension (n x m).",
        answer: "True",
        alternatives: ["False"],
        explanation: "The rank-k approximation $U_k \\Sigma_k V_k^T$ has the same dimensions (n x m) as the original, but rank at most k."
    },
    {
        topic: "SVD",
        question: "The rank-k approximation of an (n x m) matrix also has dimension (n x k).",
        answer: "False",
        alternatives: ["True"],
        explanation: "The rank-k approximation $U_k \\Sigma_k V_k^T$ has the same dimensions (n x m) as the original, but rank at most k."
    },
    {
        topic: "SVD",
        question: "As k increases, the Frobenius distance between a matrix and its rank-k approximation decreases.",
        answer: "True",
        alternatives: ["False"],
        explanation: "By the Eckart-Young theorem, rank-k approximation is optimal. Adding more singular values reduces the approximation error."
    },
    {
        topic: "SVD",
        question: "A researcher applies SVD directly to data matrix X without mean-centering. The singular vectors will correctly capture the directions of maximum variance.",
        answer: "False: Without centering, SVD may align with the mean of the data rather than the true axes of variation.",
        alternatives: ["True: SVD always finds the directions of greatest variance, centering is unnecessary."],
        explanation: "Without centering, the first component may point toward the data mean rather than the direction of maximum variance."
    },
    {
        topic: "SVD",
        question: "SVD transforms a dataset into linearly independent components, but these components may still be correlated.",
        answer: "False",
        alternatives: ["True"],
        explanation: "SVD produces orthogonal (uncorrelated) components. The columns of U and V are orthonormal."
    },
    {
        topic: "SVD",
        question: "SVD transforms a dataset into linearly independent components, but these components may still be dependent via non-linear relationships.",
        answer: "True",
        alternatives: ["False"],
        explanation: "SVD removes linear correlation but cannot detect or remove non-linear dependencies between components."
    },
    {
        topic: "SVD",
        question: "Consider a matrix with only two features X and Y, each with mean 0. If X has higher variance, then the cosine similarity between X and the first principal component will be greater than the cosine similarity between Y and the first PC.",
        answer: "True",
        alternatives: ["False"],
        explanation: "In 2D, if Var(X) > Var(Y), the first PC must align more with X. While correlation affects the PC direction, it can only tilt it—never past 45° toward the lower-variance feature. Mathematically, |v₂/v₁| < 1 always holds when Var(X) > Var(Y)."
    },
    {
        topic: "SVD",
        question: "Using SVD for feature selection is an example of:",
        answer: "Dimensionality Reduction",
        alternatives: ["Anomaly Detection", "Denoising"],
        explanation: "SVD-based feature selection reduces the number of features by keeping only the most important principal components."
    },
    {
        topic: "SVD",
        question: "What is the rank of the following dataset?",
        answer: "1",
        alternatives: ["2", "3", "4"],
        explanation: "Points lie on a line in 2D space. Rank is 1 (data spans 1 direction).",
        image: "images/svd/1.png"
    },
    {
        topic: "SVD",
        question: "What is the rank of the following dataset?",
        answer: "2",
        alternatives: ["1", "3", "4"],
        explanation: "Points span a 2D region, so rank equals dimension equals 2.",
        image: "images/svd/2.png"
    },
    {
        topic: "SVD",
        question: "What is the rank of the following dataset?",
        answer: "2",
        alternatives: ["1", "3", "4"],
        explanation: "Points span a 2D region, so rank equals dimension equals 2.",
        image: "images/svd/3.png"
    },
    {
        topic: "SVD",
        question: "What is the rank of the following dataset?",
        answer: "2",
        alternatives: ["1", "3", "4"],
        explanation: "Points span a 2D region, so rank equals dimension equals 2.",
        image: "images/svd/4.png"
    },
    {
        topic: "SVD",
        question: "Normalizing features means each will have variance 1. If all features are normalized before SVD, their contribution in each principal component will be equal.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Equal variance doesn't mean equal contribution. PC loadings depend on correlations between features, not just individual variances."
    },
    {
        topic: "SVD",
        question: "In SVD, $U$ multiplied by $\\Sigma$ is a representation of our dataset in the dimensional space where each principal component is a basis vector.",
        answer: "True",
        alternatives: ["False"],
        explanation: "$U\\Sigma$ gives the coordinates of data points in the principal component space (scaled by singular values)."
    },
    {
        topic: "SVD",
        question: "Using SVD for matrix approximation is an example of:",
        answer: "Denoising",
        alternatives: ["Anomaly Detection", "Dimensionality Reduction"],
        explanation: "Low-rank approximation via SVD removes noise by discarding small singular values (assumed to be noise)."
    },
    // ==========================================
    // KNN
    // ==========================================
    {
        topic: "KNN",
        question: "In KNN, when K=1, what is the training set accuracy?",
        answer: "100%",
        alternatives: ["50%", "0%", "Impossible to tell"],
        explanation: "With K=1, each point's nearest neighbor is itself (distance 0), so every training point is classified correctly."
    },
    {
        topic: "KNN",
        question: "In KNN, the bigger the K the higher the chance of overfitting.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Larger K means more smoothing, which reduces overfitting. Small K (especially K=1) overfits."
    },
    {
        topic: "KNN",
        question: "In KNN, the bigger the K the higher the chance of underfitting.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Larger K means more averaging, which can over-smooth and miss local patterns (underfitting)."
    },
    {
        topic: "KNN",
        question: "In KNN, if income scale is much higher than other features, nearest neighbors will almost always be those with closest income regardless of other features.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Without feature scaling, high-magnitude features dominate distance calculations. Normalization is essential for KNN."
    },
    {
        topic: "KNN",
        question: "Where is the decision boundary of KNN for K=1 for the following dataset: {(1,A), (4,A), (7,B), (10,B)}?",
        answer: "5.5",
        alternatives: ["2.5", "3.5", "4.5"],
        explanation: "The decision boundary is halfway between the nearest points of different classes.",
    },
    {
        topic: "KNN",
        question: "In KNN, when K=3, what is the minimum the training set accuracy can be?",
        answer: "0%",
        alternatives: ["33.33%", "50%"],
        explanation: "With K=3, a point votes for itself. In the worst case (all other nearest neighbors are different class), accuracy is 0%."
    },
    {
        topic: "KNN",
        question: "In KNN, the smaller the K the higher the chance of overfitting.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Small K makes the model sensitive to noise and local fluctuations. K=1 perfectly fits training data (100% accuracy) but may generalize poorly."
    },
    {
        topic: "KNN",
        question: "Consider a 2D dataset where feature x is roughly 10 times larger than feature y. Then differences in x will contribute 100 times more to the Euclidean distance than differences in y.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Euclidean distance squares differences but then takes the square root. If x differences are 10× larger, their squared contribution is 100× larger, but the square root is only 10× larger."
    },
    {
        topic: "KNN",
        question: "Consider the 1D labeled dataset: X = {(1,A), (3,A), (7,B), (10,B)}. When k=1, the decision boundary will be:",
        answer: "5",
        alternatives: ["4.5", "5.5", "6", "6.5"],
        explanation: "The boundary is halfway between the nearest points of different classes: (3,A) and (7,B). Midpoint = (4+7)/2 = 5.5."
    },
    {
        topic: "KNN",
        question: "In KNN, the decision boundary is always piecewise linear.",
        answer: "True",
        alternatives: ["False"],
        explanation: "KNN decision boundaries are Voronoi diagram edges, which are piecewise linear (straight line segments forming polygonal regions)."
    },
    {
        topic: "KNN",
        question: "KNN has a long training time.",
        answer: "False",
        alternatives: ["True"],
        explanation: "KNN is a lazy learner with essentially no training time—it just stores the data. The computational cost is at prediction time when it searches for nearest neighbors."
    },
    // ==========================================
    // DECISION TREES
    // ==========================================
    {
        topic: "Decision Trees",
        question: "What is the GINI of a node that only contains examples of a single class?",
        answer: "0",
        alternatives: [".5", "1", "Impossible to calculate with the information provided"],
        explanation: "GINI = $1 - \\sum p_i^2$. With one class, p=1, so GINI = 1 - 1 = 0. Pure nodes have GINI = 0."
    },
    {
        topic: "Decision Trees",
        question: "Classify the following example using the decision tree: Income = 90K",
        answer: "YES",
        alternatives: ["NO", "Impossible without knowing the values for refund and marital status"],
        explanation: "Following the tree no matter what the values for refund and marital status are, with Income = 90K leads to the YES classification.",
        image: "images/decisiontrees/2.png"
    },
    {
        topic: "Decision Trees",
        question: "Assuming binary classification, what is the GINI of a node with equal number of examples from each class?",
        answer: ".5",
        alternatives: ["0", "1", "Impossible to calculate with the information provided"],
        explanation: "GINI = 1 - (0.5² + 0.5²) = 1 - 0.5 = 0.5. Maximum impurity for binary classification."
    },
    {
        topic: "Decision Trees",
        question: "Splitting on an attribute with a bigger GINI will result in a worse overall decision tree.",
        answer: "False",
        alternatives: ["True"],
        explanation: "A high-GINI parent can produce low-GINI children."
    },
    {
        topic: "Decision Trees",
        question: "Classify (Refund=NO, Marital Status=MARRIED, Income=90K) using the decision tree below:",
        answer: "NO",
        alternatives: ["YES", "Impossible as we need to know the default class"],
        explanation: "Following the tree: Refund=NO → Marital Status=MARRIED → NO.",
        image: "images/1.png"
    },
    {
        topic: "Decision Trees",
        question: "The GINI of a split is just the weighted average of the GINIs of each node created by the split.",
        answer: "True",
        alternatives: ["False"],
        explanation: "GINI of split = $\\sum \\frac{n_i}{n} \\cdot GINI_i$, weighted by the proportion of examples in each child node."
    },
    {
        topic: "Decision Trees",
        question: "The GINI of the split of a parent node is always greater than the GINI of the split of its children nodes.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Children nodes can have higher GINI than parent."
    },
    {
        topic: "Decision Trees",
        question: "For a classification task with 2 or more classes C, what is the GINI of a node that contains equal examples of each class?",
        answer: "1 - 1/C",
        alternatives: ["1/C", "1/2", "Impossible to calculate with the information provided"],
        explanation: "GINI = $1 - \\sum p_i^2$. With |C| classes each having probability 1/|C|, GINI = $1 - |C| \\cdot (1/|C|)^2 = 1 - 1/|C|$."
    },
    {
        topic: "Decision Trees",
        question: "The best decision tree is the one that minimizes the GINI at each split.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Greedy GINI minimization doesn't guarantee the globally best tree. A split that seems worse locally might lead to a better overall tree. Finding the optimal tree is NP-hard."
    },
    // ==========================================
    // NAIVE BAYES
    // ==========================================
    {
        topic: "Naive Bayes",
        question: "Naive Bayes should not be used if the features are: [total_price, unit_price, quantity]",
        answer: "True",
        alternatives: ["False"],
        explanation: "These features are dependent (total = unit × quantity) and the 'naive' assumption is violated."
    },
    {
        topic: "Naive Bayes",
        question: "Naive Bayes should not be used if the features are: [is_circle, is_not_circle]",
        answer: "True",
        alternatives: ["False"],
        explanation: "These features are dependent and the 'naive' assumption is violated."
    },
    {
        topic: "Naive Bayes",
        question: "Estimate $P(\\text{Attribute A} = Yes | \\text{Class} = No)$ from the data.",
        answer: "3/7",
        alternatives: ["3/10", "1"],
        explanation: "Count examples where Class=No and Attribute A=Yes, divide by total Class=No examples.",
        image: "images/naivebayes/1.png"
    },
    {
        topic: "Naive Bayes",
        question: "Using Naive Bayes and the same dataset, classify (No, Divorced, Mid).",
        answer: "No",
        alternatives: ["Yes", "Impossible as we need to know the default class"],
        explanation: "Calculate P(Yes|features) and P(No|features) using Naive Bayes formula. P(No|features) is higher.",
        image: "images/naivebayes/1.png"
    },
    {
        topic: "Naive Bayes",
        question: "Naive Bayes assumes that all our features are independent.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Naive Bayes assumes features are conditionally independent given the class, not unconditionally independent."
    },
    {
        topic: "Naive Bayes",
        question: "Naive Bayes assumes that all our features, conditioned on the class, are independent.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Naive Bayes assumes features are conditionally independent given the class."
    },
    {
        topic: "Naive Bayes",
        question: "$P(Y|X)$ is of interest in both Naive Bayes and Logistic Regression. The main difference is that Logistic Regression estimates this probability directly while Naive Bayes does not.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Logistic Regression is discriminative (models P(Y|X) directly). Naive Bayes is generative (models P(X|Y) and uses Bayes' rule)."
    },
    {
        topic: "Naive Bayes",
        question: "In Naive Bayes, the decision boundary is always a straight line.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Naive Bayes can produce quadratic decision boundaries when class-conditional distributions have different variances. Only with equal variances is it linear."
    },
    // ==========================================
    // SVM (Support Vector Machines)
    // ==========================================
    {
        topic: "SVM",
        question: "What is the width of the street for the following SVM: $3x_1 + 4x_2 + 1 = 0$?",
        answer: "2/5",
        alternatives: ["1", "5", "$\\sqrt{7}$"],
        explanation: "Street width = $\\frac{2}{||w||} = \\frac{2}{\\sqrt{3^2 + 4^2}} = \\frac{2}{5}$."
    },
    {
        topic: "SVM",
        question: "Multiplying an SVM by a constant $c < 1$ expands the margin of the SVM.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Multiplying w and b by c<1 increases the margin width (2/||w|| becomes larger). The decision boundary stays the same but the margin expands."
    },
    {
        topic: "SVM",
        question: "In binary classification, the variable Y in SVM that determines class takes values of either -1 or +1, not 0 or 1.",
        answer: "True",
        alternatives: ["False"],
        explanation: "SVM uses {-1, +1} labels because the decision rule is sign(w·x + b). This makes the math cleaner with y(w·x + b) ≥ 1."
    },
    {
        topic: "SVM",
        question: "Should we expand or retract this SVM?",
        answer: "Expand",
        alternatives: ["Retract", "Neither"],
        explanation: "If all points are correctly classified and outside the margin, we should expand to find the maximum margin.",
        image: "images/svm/1.png"
    },
    {
        topic: "SVM",
        question: "Should we expand or retract this SVM?",
        answer: "Neither",
        alternatives: ["Expand", "Retract"],
        explanation: "The SVM is already optimal (maximum margin with all constraints satisfied).",
        image: "images/svm/3.png"
    },
    {
        topic: "SVM",
        question: "Should we expand or retract this SVM?",
        answer: "Expand",
        alternatives: ["Retract", "Neither"],
        explanation: "If all points are correctly classified and outside the margin, we should expand to find the maximum margin.",
        image: "images/svm/4.png"
    },
    {
        topic: "SVM",
        question: "SVM uses all training data to create the decision boundary and street.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Only support vectors (points on the margin boundaries) determine the decision boundary. Other points don't affect it."
    },
    {
        topic: "SVM",
        question: "To properly model the following dataset using SVM, the RBF kernel's parameter Gamma should be:",
        answer: "A very large positive number",
        alternatives: ["A very small positive number", "A very large negative number", "A very small negative number"],
        explanation: "Large gamma in RBF creates more complex, localized decision boundaries. For complex patterns, higher gamma is needed.",
        image: "images/2.png"
    },
    {
        topic: "SVM",
        question: "To properly model the following dataset using SVM using the RBF kernel, what should the penalty parameter C be so that no points are misclassified?",
        answer: "A very large positive number",
        alternatives: ["A very small positive number", "A very large negative number", "A very small negative number"],
        explanation: "Large C means misclassifcations are highly penalized, so we need to set C to a very large positive number.",
        image: "images/2.png"
    },
    {
        topic: "SVM",
        question: "SVM and Logistic Regression find identical solutions when the dataset is linearly separable.",
        answer: "False",
        alternatives: ["True"],
        explanation: "SVM maximizes margin (geometric objective). Logistic regression maximizes likelihood. They optimize different objectives and generally find different boundaries."
    },
    {
        topic: "SVM",
        question: "If correctly classified points far from the margin are moved farther from the margin, the SVM will move.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Only support vectors are used to determine the decision boundary, so moving points farther from the margin will not affect the decision boundary."
    },
    {
        topic: "SVM",
        question: "What is the width of the street for the following SVM: $x_1 + x_2 + 1 = 0$?",
        answer: "$\\sqrt{2}$",
        alternatives: ["1", "2"],
        explanation: "Street width = $\\frac{2}{||w||} = \\frac{2}{\\sqrt{1^2 + 1^2}} = \\frac{2}{\\sqrt{2}} = \\sqrt{2}$."
    },
    {
        topic: "SVM",
        question: "Multiplying an SVM by a constant $c > 1$ expands the SVM.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Multiplying w by c > 1 increases ||w||, which decreases the margin (2/||w||). So it contracts the street, not expands it."
    },
    {
        topic: "SVM",
        question: "Consider a separable 1D dataset with two classes. The SVM decision boundary and logistic regression boundary will be the same.",
        answer: "False",
        alternatives: ["True"],
        explanation: "SVM maximizes margin using only support vectors. Logistic regression uses all points to maximize likelihood. They optimize different objectives and typically find different boundaries."
    },
    {
        topic: "SVM",
        question: "Consider a separable 1D dataset with two classes. The SVM decision boundary and KNN with k=1 boundary will be the same.",
        answer: "True",
        alternatives: ["False"],
        explanation: "In 1D separable data, both methods place the boundary at the midpoint between the closest points of different classes. SVM's support vectors are exactly these closest points, and KNN k=1's boundary is where the nearest neighbor switches class—both at (max(A) + min(B))/2."
    },
    // ==========================================
    // GENERAL MODELING
    // ==========================================
    {
        topic: "General Modeling",
        question: "Overfitting is when:",
        answer: "Accuracy on the training set is high AND Accuracy on the testing set is low",
        alternatives: ["Accuracy on the training set is high AND Accuracy on the testing set is high", "Accuracy on the training set is low AND Accuracy on the testing set is high", "Accuracy on the training set is low AND Accuracy on the testing set is low"],
        explanation: "Overfitting means the model memorizes training data but fails to generalize. High train accuracy, low test accuracy is the signature."
    },
    {
        topic: "General Modeling",
        question: "Underfitting is when:",
        answer: "Accuracy on the training set is low",
        alternatives: ["Accuracy on the training set is high AND Accuracy on the testing set is high", "Accuracy on the training set is high AND Accuracy on the testing set is low", "Accuracy on the testing set is high"],
        explanation: "Underfitting means the model is too simple to capture patterns. Train accuracy is low."
    },
    {
        topic: "General Modeling",
        question: "Adjusting a model based on the testing set performance is a form of overfitting.",
        answer: "True",
        alternatives: ["False"],
        explanation: "This is data leakage. The test set should only be used for final evaluation, not model tuning. Use validation set for tuning."
    },
    {
        topic: "General Modeling",
        question: "After finding the best model, it's best practice to merge training and testing sets and retrain to maximize potential.",
        answer: "False",
        alternatives: ["True"],
        explanation: "The test set should remain untouched for unbiased evaluation. Retraining on it invalidates your performance estimate."
    },
    {
        topic: "General Modeling",
        question: "Cross-validation is used to tune model parameters and is only applied to the training set.",
        answer: "True",
        alternatives: ["False"],
        explanation: "CV is for model selection/tuning using only training data. Test set is held out for final evaluation."
    },
    {
        topic: "General Modeling",
        question: "If classes are imbalanced, accuracy can be over-inflated. In this case, the preferred metric is:",
        answer: "F1-score",
        alternatives: ["Precision", "Recall"],
        explanation: "F1-score balances precision and recall, making it better for imbalanced data than accuracy alone."
    },
    {
        topic: "General Modeling",
        question: "Boosting and Bagging are both ensemble methods but:",
        answer: "Both of the above",
        alternatives: ["Bagging samples randomly with replacement while Boosting varies weights based on prediction success", "Bagging averages predictions while Boosting takes a weighted average", "None of the above"],
        explanation: "Bagging: random sampling with replacement, equal-weight averaging. Boosting: weight adjustment based on errors, weighted combination."
    },
    {
        topic: "General Modeling",
        question: "What is the probability that a Bagging classifier with 3 classifiers each with error rate 0.1 incorrectly classifies a data point?",
        answer: "28/1000",
        alternatives: ["1/100", "1/1000", "4/100"],
        explanation: "Need majority wrong: P(≥2 wrong) = C(3,2)(0.1)²(0.9) + C(3,3)(0.1)³ = 3(0.01)(0.9) + 0.001 = 0.027 + 0.001 = 0.028 = 28/1000."
    },
    // ==========================================
    // LINEAR REGRESSION & HYPOTHESIS TESTING
    // ==========================================
    {
        topic: "Linear Regression",
        question: "A mathematical function cannot have multiple Y values for a single X, but according to linear regression assumptions, our dataset can contain multiple different Y values for a fixed X.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Linear regression models $Y = \\beta_0 + \\beta_1 X + \\epsilon$. The error term ε allows different Y values for the same X. The model is a conditional distribution, not a function."
    },
    {
        topic: "Linear Regression",
        question: "According to linear regression assumptions, X is a random variable following a normal distribution.",
        answer: "False",
        alternatives: ["True"],
        explanation: "In classical linear regression, X is treated as fixed (not random). The normality assumption applies to errors ε, not X."
    },
    {
        topic: "Linear Regression",
        question: "According to linear regression, $\\hat{Y} = \\beta_0 + \\beta_1 X + \\beta_2 X^2$ is a valid linear model.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The model is linear in parameters (β₀, β₁, β₂), not necessarily in X. Polynomial regression is still 'linear regression' because it's linear in coefficients."
    },
    {
        topic: "Linear Regression",
        question: "The estimate $\\hat{\\beta}$ is a random variable with mean $\\beta$.",
        answer: "True",
        alternatives: ["False"],
        explanation: "OLS estimators are unbiased: $E[\\hat{\\beta}] = \\beta$. The estimates vary with different samples, making them random variables."
    },
    {
        topic: "Linear Regression",
        question: "In linear regression, finding $\\hat{\\beta}$ is an optimization problem that always has a unique solution.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Unique solution requires X'X to be invertible. With multicollinearity (rank-deficient X), infinite solutions exist."
    },
    {
        topic: "Linear Regression",
        question: "If X and Y are colinear, the fitted line from linear regression is exactly the first principal component.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Linear regression minimizes vertical residuals; PCA minimizes perpendicular residuals. They find the same line if X and Y are perfectly correlated."
    },
    {
        topic: "Hypothesis Testing",
        question: "A 99% confidence interval contains its target with 99% probability.",
        answer: "False",
        alternatives: ["True"],
        explanation: "The parameter is fixed; the interval is random. 99% of intervals constructed this way contain the true value, but a specific interval either does or doesn't."
    },
    {
        topic: "Hypothesis Testing",
        question: "It's more likely that a 99% confidence interval contains the target than a 98% confidence interval.",
        answer: "False",
        alternatives: ["True"],
        explanation: "A confidence interval does not have a probability of containing the parameter."
    },
    {
        topic: "Hypothesis Testing",
        question: "Out of 100 99% confidence intervals, 99 are expected to contain the true parameter value.",
        answer: "True",
        alternatives: ["False"],
        explanation: "By definition, 99% CI means on average 99 out of 100 such intervals contain the true value."
    },
    {
        topic: "Hypothesis Testing",
        question: "The p-value of a coefficient in linear regression tells you how likely it is to observe this (or more extreme) relationship if there was no relationship at all.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The p-value tests H₀: β = 0. It's the probability of seeing the observed t-statistic (or more extreme) if the true coefficient is zero."
    },
    {
        topic: "Linear Regression",
        question: "According to linear regression, the function $\\hat{Y} = \\beta_0 + \\beta_1 X + \\beta_2 X^2 + \\beta_3 X^3$ is a valid linear model.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The model is 'linear' in the parameters (β₀, β₁, β₂, β₃), not in X. Polynomial regression is a special case of linear regression with transformed features."
    },
    {
        topic: "Linear Regression",
        question: "In linear regression with an intercept, the sum of the residuals is always 0.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The OLS normal equations ensure $\\sum e_i = 0$ when an intercept is included. This is why the regression line passes through $(\\bar{x}, \\bar{y})$."
    },
    {
        topic: "Hypothesis Testing",
        question: "Two TAs grade exams. TA1: 100 exams, mean=80, std=10. TA2: 100 exams, mean=85, std=15. TA1 argues the overall average is closer to 80 because their std is lower. Are they correct?",
        answer: "No",
        alternatives: ["Yes"],
        explanation: "Standard deviation measures spread, not influence on the mean. With equal sample sizes, the overall mean is simply (80+85)/2 = 82.5. The std is irrelevant for computing the combined mean."
    },
    {
        topic: "Hypothesis Testing",
        question: "For estimating a positive population mean: flip a coin—heads gives (0, ∞), tails gives (-∞, 0). This is a 50% confidence interval.",
        answer: "True",
        alternatives: ["False"],
        explanation: "This interval contains the true (positive) mean 50% of the time (when heads). It satisfies the definition of a 50% CI, though it's not useful practically."
    },
    // ==========================================
    // LOGISTIC REGRESSION
    // ==========================================
    {
        topic: "Logistic Regression",
        question: "In Binary Logistic Regression it is assumed that Y follows a Bernoulli Distribution with parameter $p = \\sigma(X\\beta)$.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Logistic regression models $P(Y=1|X) = \\sigma(X\\beta)$ where σ is the sigmoid. Y|X is Bernoulli with this probability."
    },
    {
        topic: "Logistic Regression",
        question: "In Binary Logistic Regression it is assumed that X follows a Logistic Distribution.",
        answer: "False",
        alternatives: ["True"],
        explanation: "There's no distributional assumption on X. The 'logistic' refers to the logistic/sigmoid function used to model probabilities."
    },
    {
        topic: "Logistic Regression",
        question: "The Sigmoid Function is a Probability Density Function since it models probabilities.",
        answer: "False",
        alternatives: ["True"],
        explanation: "The sigmoid outputs probabilities but is not a PDF. It maps ℝ → (0,1). The logistic distribution's CDF is the sigmoid; its PDF is different."
    },
    {
        topic: "Logistic Regression",
        question: "The hyperbolic tangent (tanh) can be used instead of the sigmoid function since it also has a sigmoid shape.",
        answer: "False",
        alternatives: ["True"],
        explanation: "tanh outputs values in (-1, 1), not (0, 1). It's not suitable for modeling probabilities without transformation."
    },
    {
        topic: "Logistic Regression",
        question: "The CDF of a normal distribution can be used instead of the sigmoid function since it also has a sigmoid shape.",
        answer: "True",
        alternatives: ["False"],
        explanation: "This gives Probit regression. The normal CDF (Φ) maps ℝ → (0,1) and can model probabilities."
    },
    {
        topic: "Logistic Regression",
        question: "No matter which sigmoid-shaped function we use, the decision boundary will be linear just like standard logistic regression.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The decision boundary is where P(Y=1) = 0.5, i.e., f(Xβ) = 0.5, which means Xβ = f⁻¹(0.5). For symmetric functions, this gives linear boundaries."
    },
    {
        topic: "Logistic Regression",
        question: "The Mean Squared Error can be used in Logistic Regression but creates a non-convex function because of the sigmoid, so it's usually avoided.",
        answer: "True",
        alternatives: ["False"],
        explanation: "MSE with sigmoid creates multiple local minima. Cross-entropy is convex and preferred."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression, points on the same line parallel to the decision boundary are assigned the same probability.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Probability = σ(w·x + b). Points with the same w·x + b value have the same probability. These are lines parallel to the boundary."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression, every unit away from the decision boundary in a direction perpendicular to the boundary changes the probability of the class linearly.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Probability = σ(w·x + b). Every unit away from the boundary changes the probability of the class in a non-linear way."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression, outliers are assigned very low probabilities since they are most likely neither class.",
        answer: "False",
        alternatives: ["True"],
        explanation: "Logistic regression assigns probabilities close to 0 or 1 for points far from the boundary. Outliers get extreme (confident) probabilities, not low ones."
    },
    {
        topic: "Logistic Regression",
        question: "Using Negative Log Likelihood in Logistic Regression ensures at most one minimum and, if it exists, it's a global minimum.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The NLL for logistic regression is convex. Convex functions have at most one minimum, which is global if it exists."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression, the decision boundary is always linear because it's where the sigmoid function equals 1/2.",
        answer: "True",
        alternatives: ["False"],
        explanation: "The boundary is where $\\sigma(w \\cdot x + b) = 0.5$, which means $w \\cdot x + b = 0$. This is a linear equation defining a hyperplane."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression, the gradient used to update model parameters contains the derivative of the sigmoid function.",
        answer: "Flase",
        alternatives: ["True"],
        explanation: "The gradient of the log-likelihood simplifies and does not contain the derivative of the sigmoid function."
    },
    {
        topic: "Logistic Regression",
        question: "Logistic regression fails to converge on linearly separable data because the optimal weights grow without bound.",
        answer: "True",
        alternatives: ["False"],
        explanation: "With separable data, larger weights give more confident (closer to 0 or 1) predictions, increasing likelihood. The MLE doesn't exist at finite values—weights diverge to infinity."
    },
    {
        topic: "Logistic Regression",
        question: "In logistic regression with more than two classes, the decision boundary is piecewise linear.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Multiclass logistic regression (softmax) produces linear boundaries between each pair of classes. The overall boundary is piecewise linear, with different linear pieces separating different class pairs."
    },
    // ==========================================
    // NEURAL NETWORKS
    // ==========================================
    {
        topic: "Neural Networks",
        question: "Neurons in deeper layers get saturated because of:",
        answer: "The variance of the data becoming too small by repeated squashing of the data.",
        alternatives: ["The data becoming not centered around 0 by activation functions like sigmoid."],
        explanation: "Saturation happens because of variance squashing causing the neuron to become constant."
    },
    {
        topic: "Neural Networks",
        question: "In deep networks with tanh or sigmoid activations, early layers struggle to learn because gradients become too small by the time they reach the first layer.",
        answer: "True",
        alternatives: ["False"],
        explanation: "This is the vanishing gradient problem. Gradients multiply through layers, and since sigmoid/tanh derivatives are ≤ 1, gradients shrink exponentially in deep networks."
    },
    {
        topic: "Neural Networks",
        question: "Gradient descent without backpropagation will converge to the same weights as gradient descent with backpropagation.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Backpropagation is just an efficient way to compute gradients using the chain rule. Without it, you can compute gradients (less efficiently), and the same gradient leads to the same updates."
    },
    {
        topic: "Neural Networks",
        question: "Even with a complex architecture, a neural network with no activation function in hidden layers is the same as a neural network with no hidden layers.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Without nonlinear activations, composing linear transformations yields another linear transformation: $W_2(W_1 x) = (W_2 W_1)x = Wx$. The output is still linear, like logistic regression."
    },
    {
        topic: "Neural Networks",
        question: "You train a fully-connected network with tanh activation and sigmoid output. Input features have large positive means. What will happen?",
        answer: "Most hidden features will be constant (either all 1 or all -1) on initialization and take a very long time to change because gradients are very small.",
        alternatives: ["It will work fine - neural networks can adapt to any features", "The network will crash because finding the derivative of the sigmoid function is not possible."],
        explanation: "Large positive inputs push tanh into saturation (near 1), where gradients are nearly zero. Learning is extremely slow. This is why input normalization is crucial."
    },
    {
        topic: "Neural Networks",
        question: "In deep networks with sigmoid activations, neurons in later layers are more likely to become saturated because early layers map different inputs into similar directions, causing variance to shrink.",
        answer: "True",
        alternatives: ["False"],
        explanation: "Each sigmoid layer squashes outputs to (0,1), reducing variance. After many layers, all activations become similar, pushing later layers into saturation."
    },
    {
        topic: "Neural Networks",
        question: "Variance squashing can be prevented by initializing the weights differently at each layer.",
        answer: "True",
        alternatives: ["False"],
        explanation: "See Xavier initialization."
    },
    {
        topic: "Neural Networks",
        question: "If two input features differ by a factor of 100 in scale, backpropagation will automatically adjust the relevant weights, so feature scaling is not necessary.",
        answer: "False",
        alternatives: ["True"],
        explanation: "While gradients can eventually compensate, unscaled features create an ill-conditioned loss surface with elongated contours. This dramatically slows convergence and can cause instability."
    },
    {
        topic: "Neural Networks",
        question: "Stochastic Gradient Descent could use a single example to update the weights instead of the entire batch.",
        answer: "True",
        alternatives: ["False"],
        explanation: "True SGD uses batch size of 1 (single example). Mini-batch SGD uses small batches. Both are valid—single examples give noisy but frequent updates."
    }
];

// Make QUESTIONS available globally
if (typeof window !== 'undefined') {
    window.QUESTIONS = QUESTIONS;
}
