// Check if this is the first visit and redirect to start page
if (
  !sessionStorage.getItem("visited") &&
  !window.location.pathname.includes("start.html")
) {
  sessionStorage.setItem("visited", "true");
  window.location.href = "start.html";
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check which page is loaded
  if (document.body.classList.contains("home-page")) {
    initHomePage();
  } else if (document.body.classList.contains("intro-page")) {
    initIntroPage();
  } else if (document.body.classList.contains("predictor-page")) {
    initPredictorPage();
  } else if (document.body.classList.contains("analyzer-page")) {
    initAnalyzerPage();
  } else if (document.body.classList.contains("start-page")) {
    initStartPage();
  } else if (document.body.classList.contains("help-page")) {
    initHelpPage();
  }

  // Handle hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length > 0) {
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Prevent default anchor behavior
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
        }

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
      }
    });
  }

  // Add scroll reveal animation for feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  if (featureCards.length) {
    const revealCard = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    };

    const cardObserver = new IntersectionObserver(revealCard, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    });

    featureCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = "all 0.5s ease " + index * 0.1 + "s";
      cardObserver.observe(card);
    });
  }

  // Add hover effect to navigation links
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.color = "#6c63ff";
      }
    });

    link.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.color = "";
      }
    });
  });

  // Add floating animation to the Pridictx text
  const pridictxText = document.querySelector(".pridictx-text");
  if (pridictxText) {
    // The animation is already defined in CSS, but we can add some extra effects on hover
    pridictxText.addEventListener("mouseenter", function () {
      this.style.textShadow = "0 0 20px rgba(108, 99, 255, 0.8)";
      this.style.transform = "scale(1.05)";
    });

    pridictxText.addEventListener("mouseleave", function () {
      this.style.textShadow = "";
      this.style.transform = "";
    });
  }

  // Add a more dramatic hover effect to the primary button
  const primaryBtn = document.querySelector(".primary-btn");
  if (primaryBtn) {
    primaryBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });

    primaryBtn.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  }

  // Add animation to the bug
  const bug = document.querySelector(".bug i");
  if (bug) {
    bug.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.5) rotate(10deg)";
      this.style.color = "#ff3e1d";
      this.style.textShadow = "0 0 25px rgba(255, 99, 71, 0.9)";
    });

    bug.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.color = "";
      this.style.textShadow = "";
    });
  }

  // Add animation to additional features on features page
  const additionalFeatures = document.querySelectorAll(".additional-feature");
  if (additionalFeatures.length) {
    const revealFeature = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    };

    const featureObserver = new IntersectionObserver(revealFeature, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    });

    additionalFeatures.forEach((feature, index) => {
      feature.style.opacity = "0";
      feature.style.transform = "translateY(30px)";
      feature.style.transition = "all 0.5s ease " + index * 0.1 + "s";
      featureObserver.observe(feature);
    });
  }

  // Add page transition effect
  const links = document.querySelectorAll("a[href]:not([href^='#'])");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply to internal links
      if (this.hostname === window.location.hostname) {
        e.preventDefault();
        const href = this.getAttribute("href");

        // Fade out current page
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.3s ease";

        // Navigate to new page after fade out
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // Fade in page on load
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Add scroll effect to header for better blending
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(15, 12, 41, 0.8)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = "transparent";
      header.style.backdropFilter = "none";
    }
  });

  // Initialize help page if we're on that page
  initHelpPage();

  // Initialize introduction page if on that page
  initIntroPage();

  // Initialize predictor page if on that page
  if (document.querySelector(".predictor-page")) {
    initPredictorPage();
  }

  // Initialize pages based on the page we're on
  if (document.querySelector(".start-page")) {
    initStartPage();
  } else if (document.querySelector(".help-page")) {
    initHelpPage();
  } else if (document.querySelector(".intro-page")) {
    initIntroPage();
  } else if (document.querySelector(".predictor-page")) {
    initPredictorPage();
  }
});

// Start page functions
function initStartPage() {
  const logoText = document.getElementById('logo-text');
  
  if (!logoText) return;
  
  // Center logo text only - no animations or effects
  logoText.textContent = "PridictX";
  
  // Remove all particles
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    particlesContainer.innerHTML = '';
  }
}

// Help page functions
function initHelpPage() {
  if (document.getElementById("datetime")) {
    // Add fade-in animation for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    });

    document.querySelectorAll(".metric-section").forEach((section) => {
      observer.observe(section);
    });

    updateDateTime();
  }
}

function updateDateTime() {
  const datetimeElement = document.getElementById("datetime");
  if (!datetimeElement) return;

  const now = new Date();

  // Date formatting (e.g., "January 4, 2025")
  const date = now.toLocaleDateString("en-US", {
    weekday: "long", // Full weekday name (e.g., "Friday")
    year: "numeric",
    month: "long", // Full month name (e.g., "January")
    day: "numeric",
  });

  // Time formatting (e.g., "14:30:45")
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Display both date and time
  datetimeElement.textContent = `${date} ${timeString}`;

  // Update every second
  setTimeout(updateDateTime, 1000);
}

// Introduction page functionality
function initIntroPage() {
  // Skip if not on the intro page
  if (!document.querySelector(".intro-page")) return;

  // Animate intro cards
  const introCards = document.querySelectorAll(".intro-card");
  if (introCards.length > 0) {
    // Apply initial styles
    introCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.5s ease-out";
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Create intersection observer for intro cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all intro cards
    introCards.forEach((card) => {
      cardObserver.observe(card);
    });
  }

  // Animate section headers
  const sectionHeaders = document.querySelectorAll(".section-header");
  if (sectionHeaders.length > 0) {
    sectionHeaders.forEach((header) => {
      header.style.opacity = "0";
      header.style.transform = "translateY(20px)";
      header.style.transition = "all 0.5s ease-out";
    });

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            headerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionHeaders.forEach((header) => {
      headerObserver.observe(header);
    });
  }

  // Animate highlight items
  const highlightItems = document.querySelectorAll(".highlight-item");
  if (highlightItems.length > 0) {
    highlightItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(30px)";
      item.style.transition = "all 0.5s ease-out";
      item.style.transitionDelay = `${index * 0.15}s`;
    });

    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
            highlightObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    highlightItems.forEach((item) => {
      highlightObserver.observe(item);
    });
  }

  // Animate orbit animation
  const orbitAnimation = document.querySelector(".orbit-animation");
  if (orbitAnimation) {
    orbitAnimation.style.opacity = "0";
    orbitAnimation.style.transform = "scale(0.7)";
    orbitAnimation.style.transition = "all 1s ease-out";

    const orbitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "scale(1)";
            }, 300); // Slight delay for better visual effect
            orbitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    orbitObserver.observe(orbitAnimation);
  }

  // Animate team preview cards
  const teamCards = document.querySelectorAll(".team-preview-card");
  if (teamCards.length > 0) {
    teamCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = "all 0.6s ease-out";
      card.style.transitionDelay = `${index * 0.2}s`;
    });

    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            teamObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    teamCards.forEach((card) => {
      teamObserver.observe(card);
    });
  }

  // Animate CTA section
  const cta = document.querySelector(".intro-cta");
  if (cta) {
    const ctaTitle = cta.querySelector("h2");
    const ctaText = cta.querySelector("p");
    const ctaButtons = cta.querySelector(".cta-buttons");

    if (ctaTitle) {
      ctaTitle.style.opacity = "0";
      ctaTitle.style.transform = "translateY(20px)";
      ctaTitle.style.transition = "all 0.5s ease-out";
    }

    if (ctaText) {
      ctaText.style.opacity = "0";
      ctaText.style.transform = "translateY(20px)";
      ctaText.style.transition = "all 0.5s ease-out 0.1s";
    }

    if (ctaButtons) {
      ctaButtons.style.opacity = "0";
      ctaButtons.style.transform = "translateY(20px)";
      ctaButtons.style.transition = "all 0.5s ease-out 0.2s";
    }

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ctaTitle) {
              ctaTitle.style.opacity = "1";
              ctaTitle.style.transform = "translateY(0)";
            }

            if (ctaText) {
              ctaText.style.opacity = "1";
              ctaText.style.transform = "translateY(0)";
            }

            if (ctaButtons) {
              ctaButtons.style.opacity = "1";
              ctaButtons.style.transform = "translateY(0)";
            }

            ctaObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    ctaObserver.observe(cta);
  }
}

function initPredictorPage() {
  const predictionForm = document.getElementById("prediction-form");
  const csvUploadForm = document.getElementById("csv-upload-form");
  const resultContainer = document.getElementById("result");
  const csvFileInput = document.getElementById("csv-file");
  const fileLabel = document.querySelector(".custom-file-label");
  const loadingOverlay = document.getElementById("predictorLoadingOverlay");

  // Return early if not on the predictor page
  if (!predictionForm || !csvUploadForm) return;

  // Update file label when a file is selected
  if (csvFileInput) {
    csvFileInput.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "Choose CSV File";
      fileLabel.textContent = fileName;
    });
  }

  // Manual input form submission
  if (predictionForm) {
    predictionForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get all form inputs
      const formData = new FormData(predictionForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = parseFloat(value) || 0;
      });

      // Show loading overlay
      loadingOverlay.style.display = "flex";

      // Disable submit button
      const submitBtn = predictionForm.querySelector("button");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processing...';

      try {
        // In a real implementation, this would make an API call
        // For now, we'll simulate with a timeout and random result
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Random prediction for demo purposes
        const isBuggy = Math.random() > 0.5;
        const probability = (Math.random() * 0.4 + 0.3).toFixed(2); // Random between 0.3 and 0.7

        // Show result
        resultContainer.innerHTML = `
          <div class="prediction-result ${isBuggy ? "buggy" : "not-buggy"}">
            ${
              isBuggy
                ? '<i class="fas fa-bug"></i> Bug Detected!'
                : '<i class="fas fa-check-circle"></i> No Bug Detected'
            }
          </div>
          <div class="probability">
            Confidence Level: ${(probability * 100).toFixed(2)}%
          </div>
          <p style="text-align: center; color: rgba(255, 255, 255, 0.8);">
            ${
              isBuggy
                ? "This code has a high probability of containing bugs based on the provided metrics."
                : "This code appears to be relatively bug-free based on the provided metrics."
            }
          </p>
        `;

        resultContainer.classList.add("show");
      } catch (error) {
        resultContainer.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i> Error: Unable to process request
          </div>
        `;
        resultContainer.classList.add("show");
      } finally {
        // Hide loading overlay
        loadingOverlay.style.display = "none";

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-search"></i> Predict';
      }
    });
  }

  // CSV upload form submission
  if (csvUploadForm) {
    csvUploadForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validate file was selected
      if (csvFileInput.files.length === 0) {
        alert("Please select a CSV file first");
        return;
      }

      // Show loading overlay
      loadingOverlay.style.display = "flex";

      // Disable submit button
      const submitBtn = csvUploadForm.querySelector("button");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processing...';

      try {
        // In a real implementation, this would send the file to an API
        // For now, we'll simulate with a timeout and random results
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate 3-5 random results for demo purposes
        const numResults = Math.floor(Math.random() * 3) + 3;
        let resultsHTML = "";

        for (let i = 0; i < numResults; i++) {
          const isBuggy = Math.random() > 0.5;
          const probability = (Math.random() * 0.4 + 0.3).toFixed(2);

          resultsHTML += `
            <div class="batch-item">
              <span class="batch-item-name">Row ${i + 1}</span>
              <span class="batch-item-result ${
                isBuggy ? "buggy" : "not-buggy"
              }">
                ${
                  isBuggy
                    ? '<i class="fas fa-bug"></i> Bug Detected'
                    : '<i class="fas fa-check-circle"></i> No Bug'
                } (${(probability * 100).toFixed(2)}%)
              </span>
            </div>
          `;
        }

        // Show result
        resultContainer.innerHTML = `
          <div class="prediction-result">
            <i class="fas fa-file-alt"></i> CSV Processing Results
          </div>
          <p style="text-align: center; color: rgba(255, 255, 255, 0.8); margin-bottom: 1.5rem;">
            Processed ${numResults} rows from ${csvFileInput.files[0].name}
          </p>
          <div class="batch-results">
            ${resultsHTML}
          </div>
        `;

        resultContainer.classList.add("show");
      } catch (error) {
        resultContainer.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i> Error: Unable to process CSV file
          </div>
        `;
        resultContainer.classList.add("show");
      } finally {
        // Hide loading overlay
        loadingOverlay.style.display = "none";

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload & Predict';
      }
    });
  }
}

// Initialize Code Analyzer page
function initAnalyzerPage() {
  // Get DOM elements
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");
  const fileInfo = document.getElementById("file-info");
  const fileName = document.getElementById("file-name");
  const fileSize = document.getElementById("file-size");
  const analyzeBtn = document.getElementById("analyze-btn");
  const downloadBtn = document.getElementById("download-btn");
  const newAnalysisBtn = document.getElementById("new-analysis-btn");
  const fileUploadSection = document.getElementById("file-upload-section");
  const resultsSection = document.getElementById("results-section");
  const loadingOverlay = document.getElementById("loading-overlay");
  const recommendationList = document.getElementById("recommendation-list");

  // Keep track of selected file
  window.selectedFile = null;

  // Add event listeners for drag and drop
  if (uploadArea) {
    // Add click event to open file dialog, but exclude clicks on the label element
    uploadArea.addEventListener("click", function (e) {
      // Don't trigger if the click is on the label or its children
      if (!e.target.closest('label[for="file-input"]')) {
        fileInput.click();
      }
    });

    uploadArea.addEventListener("dragover", function (e) {
      e.preventDefault();
      uploadArea.classList.add("drag-over");
    });

    uploadArea.addEventListener("dragleave", function () {
      uploadArea.classList.remove("drag-over");
    });

    uploadArea.addEventListener("drop", function (e) {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");

      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleFileSelection(file);
      }
    });
  }

  // Add event listener for file input
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        const file = this.files[0];
        handleFileSelection(file);
      }
    });
  }

  // Add event listener for analyze button
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", function () {
      if (!window.selectedFile) return;

      // Show loading overlay
      loadingOverlay.style.display = "flex";

      // Animate loading steps
      const steps = document.querySelectorAll(".loading-step");
      const progressBar = document.getElementById("progress-bar");

      steps.forEach((step) => {
        step.classList.remove("active", "completed");
      });

      steps[0].classList.add("active");
      progressBar.style.width = "0%";

      let currentStep = 0;
      const totalSteps = steps.length;

      const interval = setInterval(() => {
        if (currentStep < totalSteps - 1) {
          steps[currentStep].classList.remove("active");
          steps[currentStep].classList.add("completed");
          currentStep++;
          steps[currentStep].classList.add("active");

          // Update progress bar
          const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
          progressBar.style.width = progress + "%";
        } else {
          clearInterval(interval);

          // Begin code analysis
          analyzeCode(window.selectedFile);
        }
      }, 800);
    });
  }

  // Add event listener for download button
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      if (window.analysisResults) {
        const csv = generateCSV(window.analysisResults);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "code_analysis_results.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }

  // Generate CSV from analysis results
  function generateCSV(results) {
    let csv = "Metric,Value\n";

    // Add Basic Code Metrics
    csv += "Lines of Code," + results.loc + "\n";
    csv += "Cyclomatic Complexity," + results["v(g)"] + "\n";
    csv += "Essential Complexity," + results["ev(g)"] + "\n";
    csv += "Design Complexity," + results["iv(g)"] + "\n";
    csv += "Code Lines," + results.lOCode + "\n";
    csv += "Comment Lines," + results.lOComment + "\n";
    csv += "Blank Lines," + results.lOBlank + "\n";
    csv += "Branch Count," + results.branchCount + "\n";

    // Add Halstead Metrics
    csv += "Program Length (N)," + results.n + "\n";
    csv += "Program Volume (V)," + results.v + "\n";
    csv += "Program Level (L)," + results.l + "\n";
    csv += "Program Difficulty (D)," + results.d + "\n";
    csv += "Intelligence Content (I)," + results.i + "\n";
    csv += "Programming Effort (E)," + results.e + "\n";
    csv += "Number of Bugs (B)," + results.b + "\n";
    csv += "Time to Program (T)," + results.t + "\n";

    // Add Operator/Operand Metrics
    csv += "Unique Operators," + results.uniq_Op + "\n";
    csv += "Unique Operands," + results.uniq_Opnd + "\n";
    csv += "Total Operators," + results.total_Op + "\n";
    csv += "Total Operands," + results.total_Opnd + "\n";

    return csv;
  }

  // Add event listener for new analysis button
  if (newAnalysisBtn) {
    newAnalysisBtn.addEventListener("click", function () {
      fileUploadSection.style.display = "block";
      resultsSection.style.display = "none";
      window.selectedFile = null;
      fileInfo.style.display = "none";
      fileInput.value = "";
    });
  }

  function handleFileSelection(file) {
    // Check if file is valid
    const allowedExtensions = [".js", ".py", ".java", ".c", ".cpp", ".cs"];
    const fileExt = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      alert(
        "Please select a valid code file (.js, .py, .java, .c, .cpp, or .cs)"
      );
      return;
    }

    // Store selected file and update UI
    window.selectedFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = "flex";
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  }
}

// Code analysis function
function analyzeCode(file) {
  // Read file content
  const reader = new FileReader();
  const loadingOverlay = document.getElementById("loading-overlay");
  const fileUploadSection = document.getElementById("file-upload-section");
  const resultsSection = document.getElementById("results-section");

  reader.onload = function (e) {
    const code = e.target.result;

    // Extract basic metrics
    const metrics = extractBasicMetrics(code, file.name);

    // Call the server API for prediction
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metrics),
    })
      .then((response) => response.json())
      .then((predictionData) => {
        // Combine basic metrics with prediction results
        const results = {
          ...metrics,
          bugPrediction:
            predictionData.prediction === 1 ? "Bug Likely" : "Bug Unlikely",
          bugProbability: predictionData.probability,
          message: predictionData.message || "",
        };

        // Store results and update UI
        window.analysisResults = results;
        updateResultsUI(results);

        // Hide loading overlay and show results
        loadingOverlay.style.display = "none";
        fileUploadSection.style.display = "none";
        resultsSection.style.display = "block";

        // Generate recommendations
        generateRecommendations(results);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Fallback to client-side analysis if server call fails
        const results = generateMockResults(code, file.name);

        // Store results and update UI
        window.analysisResults = results;
        updateResultsUI(results);

        // Hide loading overlay and show results
        loadingOverlay.style.display = "none";
        fileUploadSection.style.display = "none";
        resultsSection.style.display = "block";

        // Generate recommendations
        generateRecommendations(results);
      });
  };

  reader.readAsText(file);
}

// Extract basic metrics from code
function extractBasicMetrics(code, filename) {
  // Count lines as a basic metric
  const lines = code.split("\n");
  const loc = lines.length;

  // Identify language from file extension
  const fileExt = filename.split(".").pop().toLowerCase();
  let language = "unknown";

  if (["js", "jsx", "ts", "tsx"].includes(fileExt)) language = "javascript";
  else if (["py"].includes(fileExt)) language = "python";
  else if (["java"].includes(fileExt)) language = "java";
  else if (["c", "cpp", "h", "hpp"].includes(fileExt)) language = "c++";

  // Parse code to count basic metrics
  let blankLines = 0;
  let commentLines = 0;
  let codeLines = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      blankLines++;
    } else if (
      (language === "javascript" &&
        (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*"))) ||
      (language === "python" && trimmedLine.startsWith("#")) ||
      (language === "java" &&
        (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*"))) ||
      (language === "c++" &&
        (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*")))
    ) {
      commentLines++;
    } else {
      codeLines++;
    }
  }

  // Copy remaining code from generateMockResults
  // Generate mock metrics (these would normally be calculated by sophisticated algorithms)
  const cyclomaticComplexity = Math.min(Math.round(codeLines / 7) + 1, 35);
  const essentialComplexity = Math.round(cyclomaticComplexity * 0.6);
  const designComplexity = Math.round(cyclomaticComplexity * 0.8);

  // Calculate Halstead metrics
  const uniqueOperators = Math.round(codeLines / 5) + 8;
  const uniqueOperands = Math.round(codeLines / 3) + 12;
  const totalOperators = Math.round(codeLines * 1.5);
  const totalOperands = Math.round(codeLines * 2.2);

  // Calculate derived Halstead metrics
  const programVocabulary = uniqueOperators + uniqueOperands;
  const programLength = totalOperators + totalOperands;
  const volume = Math.round(
    programLength * Math.log2(Math.max(programVocabulary, 2))
  );
  const difficulty = Math.round(
    (uniqueOperators / 2) * (totalOperands / Math.max(uniqueOperands, 1))
  );
  const effort = volume * difficulty;
  const timeToImplement = Math.round(effort / 18);
  const maintenanceIndex = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        171 -
          5.2 * Math.log(volume) -
          0.23 * cyclomaticComplexity -
          16.2 * Math.log(codeLines)
      )
    )
  );

  return {
    loc: loc,
    "v(g)": cyclomaticComplexity,
    "ev(g)": essentialComplexity,
    "iv(g)": designComplexity,
    n: programLength,
    v: volume,
    d: difficulty,
    e: effort,
    b: timeToImplement,
    t: Math.round(timeToImplement / 60),
    mi: maintenanceIndex,
    lOCode: codeLines,
    lOComment: commentLines,
    lOBlank: blankLines,
    uniq_Op: uniqueOperators,
    uniq_Opnd: uniqueOperands,
    total_Op: totalOperators,
    total_Opnd: totalOperands,
    lang: language,
    branchCount: Math.round(cyclomaticComplexity * 0.7),
    loopCount: Math.round(cyclomaticComplexity * 0.3),
    WMC: cyclomaticComplexity,
    DIT: Math.round(Math.random() * 3),
    NOC: Math.round(Math.random() * 5),
    CBO: Math.round(cyclomaticComplexity * 0.4),
    RFC: Math.round(cyclomaticComplexity * 1.2),
    LCOM: Math.round(100 - maintenanceIndex),
  };
}

// Generate mock analysis results - kept as fallback
function generateMockResults(code, filename) {
  const metrics = extractBasicMetrics(code, filename);

  // Add mock prediction
  metrics.bugPrediction = Math.random() > 0.5 ? "Bug Likely" : "Bug Unlikely";
  metrics.bugProbability = Math.random();

  return metrics;
}

// Update UI with analysis results
function updateResultsUI(results) {
  // Update Basic Code Metrics
  document.getElementById("loc").textContent = results.loc;
  document.getElementById("cyclomatic").textContent = results["v(g)"];
  document.getElementById("essential").textContent = results["ev(g)"];
  document.getElementById("design").textContent = results["iv(g)"];
  document.getElementById("code-lines").textContent = results.lOCode;
  document.getElementById("comment-lines").textContent = results.lOComment;
  document.getElementById("blank-lines").textContent = results.lOBlank;
  document.getElementById("branch-count").textContent = results.branchCount;

  // Update Halstead Metrics
  document.getElementById("program-length").textContent = results.n;
  document.getElementById("program-volume").textContent = results.v;
  document.getElementById("program-level").textContent = results.l;
  document.getElementById("program-difficulty").textContent = results.d;
  document.getElementById("intelligence-content").textContent = results.i;
  document.getElementById("programming-effort").textContent = results.e;
  document.getElementById("number-bugs").textContent = results.b;
  document.getElementById("time-program").textContent = results.t + " seconds";

  // Update Operator/Operand Metrics
  document.getElementById("unique-operators").textContent = results.uniq_Op;
  document.getElementById("unique-operands").textContent = results.uniq_Opnd;
  document.getElementById("total-operators").textContent = results.total_Op;
  document.getElementById("total-operands").textContent = results.total_Opnd;
}

// Generate recommendations based on analysis results
function generateRecommendations(results) {
  // Clear previous recommendations
  const recommendationList = document.getElementById("recommendation-list");
  if (!recommendationList) return;

  recommendationList.innerHTML = "";

  const recommendations = [];

  // Cyclomatic complexity recommendations
  if (results["v(g)"] > 10) {
    recommendations.push(
      "Reduce cyclomatic complexity by breaking down complex functions into smaller, more manageable functions."
    );
  }

  // Comment ratio recommendations
  const commentRatio = results.lOComment / results.lOCode;
  if (commentRatio < 0.1) {
    recommendations.push(
      "Consider adding more comments to improve code readability and maintainability."
    );
  } else if (commentRatio > 0.5) {
    recommendations.push(
      "Your code has a high ratio of comments to code. Consider if some comments could be replaced by more self-explanatory code."
    );
  }

  // Halstead metrics recommendations
  if (results.d > 30) {
    recommendations.push(
      "High program difficulty detected. Consider refactoring to reduce complexity and improve maintainability."
    );
  }

  if (results.b > 0.05) {
    recommendations.push(
      "The estimated number of bugs is relatively high. Consider adding more unit tests to catch potential issues."
    );
  }

  // Function length recommendation based on lines of code
  if (results.loc > 100) {
    recommendations.push(
      "Your file is relatively large. Consider breaking it down into smaller modules for better maintainability."
    );
  }

  // Add language-specific recommendations
  if (results.language === "javascript") {
    recommendations.push(
      "Consider using ESLint to enforce coding standards and catch potential issues early."
    );
  } else if (results.language === "python") {
    recommendations.push(
      "Consider using tools like Pylint or Flake8 to enforce PEP 8 style guide recommendations."
    );
  } else if (results.language === "java") {
    recommendations.push(
      "Consider using tools like PMD or Checkstyle to enforce coding standards."
    );
  }

  // Add recommendations to the list
  recommendations.forEach((recommendation) => {
    const li = document.createElement("li");
    li.textContent = recommendation;
    recommendationList.appendChild(li);
  });

  // If no recommendations were generated
  if (recommendations.length === 0) {
    const li = document.createElement("li");
    li.textContent =
      "Your code looks good! No specific recommendations at this time.";
    recommendationList.appendChild(li);
  }
}

// Enhanced the updateResultsUI function to add visualizations
const originalUpdateResultsUI = window.updateResultsUI || function () {};

window.updateResultsUI = function (results) {
  // Call the original function first
  originalUpdateResultsUI(results);

  // Add our enhancements
  setTimeout(() => {
    // Add animation to metric values
    const metricValues = document.querySelectorAll(".metric-value");
    metricValues.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(() => {
        el.style.transition = "all 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 50);
    });
  }, 300);
};

// Enhanced recommendations generation
const originalGenerateRecommendations =
  window.generateRecommendations || function () {};

window.generateRecommendations = function (results) {
  // Call the original function first
  originalGenerateRecommendations(results);

  // Add loading animation
  const recommendationList = document.getElementById("recommendation-list");
  if (recommendationList) {
    const items = recommendationList.querySelectorAll("li");
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-10px)";
      setTimeout(() => {
        item.style.transition = "all 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, 500 + index * 200);
    });
  }
};

// Enhanced loading animation
const originalAnalyzeBtn = document.getElementById("analyze-btn");
if (originalAnalyzeBtn) {
  const originalClickHandler = originalAnalyzeBtn.onclick;

  originalAnalyzeBtn.onclick = function () {
    if (!window.selectedFile) return;

    // Show an animated button state
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    this.disabled = true;

    // Add ripple effect
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      // Now call the original handler
      if (originalClickHandler) {
        originalClickHandler.call(this);
      } else {
        // If there's no original handler (which shouldn't happen), call our analyze function
        if (window.analyzeCode) {
          window.analyzeCode(window.selectedFile);
        }
      }
    }, 500);
  };
}

// Add this style for ripple effect
const style = document.createElement("style");
style.textContent = `
.btn-ripple {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// Enhanced drag-and-drop with gradient border animation
const uploadArea = document.getElementById("upload-area");
if (uploadArea) {
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!uploadArea.classList.contains("dragover")) {
      uploadArea.classList.add("dragover");

      // Create gradient animation
      uploadArea.style.borderImage =
        "linear-gradient(45deg, #2563eb, #7c3aed) 1";
      uploadArea.style.animation = "gradient-move 2s linear infinite";
    }
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
    uploadArea.style.borderImage = "";
    uploadArea.style.animation = "";
  });

  uploadArea.addEventListener("drop", () => {
    uploadArea.classList.remove("dragover");
    uploadArea.style.borderImage = "";
    uploadArea.style.animation = "";
  });

  // Add this style for gradient animation
  const gradientStyle = document.createElement("style");
  gradientStyle.textContent = `
  @keyframes gradient-move {
    0% {
      border-image: linear-gradient(45deg, #2563eb, #7c3aed, #2563eb) 1;
    }
    50% {
      border-image: linear-gradient(45deg, #7c3aed, #2563eb, #7c3aed) 1;
    }
    100% {
      border-image: linear-gradient(45deg, #2563eb, #7c3aed, #2563eb) 1;
    }
  }
  `;
  document.head.appendChild(gradientStyle);
}
