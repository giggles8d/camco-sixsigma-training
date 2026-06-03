import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TERMS = [
  // A
  { term: "Acceptance Sampling", module: 18, category: "Inspection", definition: "A statistical method of inspecting a sample from a lot to decide whether to accept or reject the entire lot. Defined by AQL (Acceptable Quality Level) and sampling plans such as MIL-STD-1916." },
  { term: "Accuracy", module: 8, category: "Metrology", definition: "The closeness of a measured value to the true value of the quantity being measured. Distinguished from precision, which describes repeatability. A gauge can be precise but inaccurate." },
  { term: "APQP (Advanced Product Quality Planning)", module: 22, category: "Quality Planning", definition: "A structured framework for defining the steps necessary to ensure a product satisfies the customer. Developed by AIAG, APQP defines five phases: planning, product design, process design, product/process validation, and production." },
  { term: "AQL (Acceptable Quality Level)", module: 18, category: "Inspection", definition: "The maximum percentage of defective units in a lot that can be considered acceptable for sampling purposes. Used in acceptance sampling plans to define the threshold between accepting and rejecting a shipment." },
  { term: "AS9100", module: 4, category: "Standards", definition: "The quality management system standard for the aviation, space, and defense industry. Based on ISO 9001 but adds requirements specific to aerospace including key characteristics, configuration management, FOD prevention, and first article inspection." },
  { term: "AS9102", module: 17, category: "Standards", definition: "The aerospace standard governing First Article Inspection (FAI). Defines three mandatory forms: Form 1 (design documentation), Form 2 (material and process verification), and Form 3 (characteristic accountability with actual measured values)." },
  { term: "AS5553", module: 20, category: "Standards", definition: "The aerospace standard for counterfeit electronic parts avoidance. Requires documented counterfeit prevention programs, approved supplier sourcing, and traceability for electronic components used in defense applications." },
  { term: "AS6174", module: 20, category: "Standards", definition: "Companion to AS5553 â addresses counterfeit prevention for non-electronic parts and raw materials. Requires supply chain integrity controls for metals, composites, and other materials used in aerospace and defense manufacturing." },
  { term: "Assignable Cause", module: 12, category: "SPC", definition: "A source of process variation that is identifiable and correctable â also called a special cause. Distinguished from common cause variation, which is inherent to the process. Assignable causes trigger out-of-control signals on control charts." },
  { term: "Attribute Data", module: 11, category: "Statistics", definition: "Data that is counted or classified rather than measured on a continuous scale. Examples: number of defects per part, pass/fail results, presence or absence of a feature. Used in p-charts, c-charts, and u-charts." },

  // B
  { term: "Bias (Measurement)", module: 13, category: "Metrology", definition: "The systematic difference between the average of repeated measurements and the reference (true) value. One of the five properties of a measurement system analyzed in MSA, along with linearity, stability, repeatability, and reproducibility." },
  { term: "Bilateral Tolerance", module: 7, category: "GD&T", definition: "A tolerance that allows variation in both directions from the nominal dimension. Expressed as Â± (e.g., 1.250 Â± 0.005). Distinguished from unilateral tolerance, which allows variation in only one direction." },

  // C
  { term: "Calibration", module: 8, category: "Metrology", definition: "The process of comparing a measurement instrument against a known reference standard to determine and document its accuracy. All calibration in defense manufacturing must be traceable to NIST or an equivalent national metrology standard." },
  { term: "Callout (Drawing)", module: 7, category: "GD&T", definition: "A notation on an engineering drawing that specifies a geometric tolerance using a feature control frame. Contains the geometric characteristic symbol, tolerance value, material condition modifier (if applicable), and datum references." },
  { term: "Capability Index", module: 12, category: "SPC", definition: "A numerical measure of how well a process can produce output within specification limits. Cp measures potential capability assuming the process is centered; Cpk measures actual capability accounting for process centering." },
  { term: "Certificate of Conformance (CoC)", module: 9, category: "Documentation", definition: "A document signed by a quality representative certifying that delivered products conform to all applicable drawing, specification, and purchase order requirements. A legally significant quality attestation required on virtually all defense deliveries." },
  { term: "Characteristic (Key)", module: 4, category: "Quality Planning", definition: "A product or process parameter whose variation has a significant effect on product safety, fit, function, performance, or subsequent processing. Key characteristics require enhanced controls, often including SPC monitoring and tighter inspection frequencies." },
  { term: "Common Cause Variation", module: 12, category: "SPC", definition: "Random variation inherent in a stable process â the natural noise of the system. Cannot be attributed to a specific identifiable cause. Reducing common cause variation requires fundamental process improvement, not reaction to individual data points." },
  { term: "Concession", module: 9, category: "Nonconformance", definition: "Written authorization to use or release a product that does not conform to specified requirements. Also called a Material Review Board (MRB) disposition. In defense manufacturing, concessions often require customer engineering approval." },
  { term: "Configuration Management", module: 4, category: "Quality Systems", definition: "The systematic control of changes to product design, documentation, and manufacturing processes to ensure consistency between design intent and actual product throughout the product lifecycle. An AS9100 requirement not found in ISO 9001." },
  { term: "Control Chart", module: 12, category: "SPC", definition: "A statistical tool used to monitor process performance over time. Plots measured values against control limits (UCL and LCL) calculated from process data. Distinguishes between common cause and assignable cause variation." },
  { term: "Control Limit", module: 12, category: "SPC", definition: "The boundaries on a control chart (UCL = Upper Control Limit, LCL = Lower Control Limit) that define the expected range of variation for a stable process. Calculated as Â±3 standard deviations from the process mean. NOT the same as specification limits." },
  { term: "Control Plan", module: 15, category: "Quality Planning", definition: "A document that describes the controls applied to a manufacturing process to ensure product quality. Defines each inspection point, the characteristic measured, the measurement method, the sample size and frequency, and the reaction plan for out-of-specification conditions." },
  { term: "Corrective Action", module: 14, category: "Quality Systems", definition: "Action taken to eliminate the root cause of a detected nonconformance or other undesirable situation to prevent recurrence. Distinct from correction (fixing the immediate problem) and preventive action (preventing potential problems)." },
  { term: "COQ (Cost of Quality)", module: 25, category: "Quality Management", definition: "The total cost associated with quality â including prevention costs (training, design reviews), appraisal costs (inspection, testing), internal failure costs (scrap, rework), and external failure costs (warranty, customer returns). World-class manufacturers target COQ below 5% of revenue." },
  { term: "COPQ (Cost of Poor Quality)", module: 25, category: "Quality Management", definition: "The sum of internal failure costs and external failure costs â the cost of not doing things right the first time. COPQ represents waste that quality improvement can eliminate. Typically 4:1 to 10:1 more expensive than prevention investment." },
  { term: "Cp", module: 12, category: "SPC", definition: "Process capability index that measures the potential capability of a process relative to the specification width. Calculated as (USL - LSL) / (6Ï). Does not account for process centering. A Cp of 1.33 indicates the process spread fills only 75% of the specification window." },
  { term: "Cpk", module: 12, category: "SPC", definition: "Process capability index that measures actual process capability accounting for both spread and centering. Calculated as the minimum of [(USL - mean) / 3Ï] and [(mean - LSL) / 3Ï]. Defense manufacturing typically requires Cpk â¥ 1.33 for key characteristics." },
  { term: "CSQR (Customer-Specific Quality Requirements)", module: 5, category: "Standards", definition: "Quality requirements unique to a specific customer, flowing down through purchase orders and quality clauses. Prime contractors like Lockheed, Raytheon, and Boeing all have CSQRs that supplement AS9100 requirements for their suppliers." },
  { term: "CMM (Coordinate Measuring Machine)", module: 10, category: "Metrology", definition: "A precision measurement device that uses a probe to measure the three-dimensional geometry of a part. Capable of measuring complex GD&T features including true position, profile, runout, and angularity. Requires qualified operators and temperature-controlled environment." },

  // D
  { term: "Datum", module: 7, category: "GD&T", definition: "A theoretically exact point, line, plane, or axis from which measurements are made. Datums establish the Datum Reference Frame (DRF) that anchors geometric tolerances to the part. Must be established in a specific order (primary, secondary, tertiary) per ASME Y14.5." },
  { term: "Datum Reference Frame (DRF)", module: 7, category: "GD&T", definition: "The three mutually perpendicular planes established by datum features that anchor the coordinate system for geometric tolerances. Proper DRF setup on a CMM is critical for accurate measurement of position, profile, and orientation tolerances." },
  { term: "DCMA (Defense Contract Management Agency)", module: 6, category: "Defense", definition: "The U.S. government agency responsible for administering defense contracts and ensuring contractor compliance with quality, schedule, and cost requirements. DCMA Quality Assurance Representatives (QARs) conduct surveillance audits at defense manufacturing facilities." },
  { term: "DFARS (Defense Federal Acquisition Regulation Supplement)", module: 5, category: "Defense", definition: "Regulations supplementing the Federal Acquisition Regulation (FAR) that apply specifically to defense contracts. Includes quality requirements, cybersecurity standards (CMMC), counterfeit parts prevention, and use of domestic materials (DFARS 252.225 series)." },
  { term: "Design of Experiments (DOE)", module: 16, category: "Quality Tools", definition: "A structured approach to varying multiple process inputs simultaneously to understand their effects on process outputs. More efficient than one-factor-at-a-time experimentation. Used to identify key process variables, optimize process settings, and reduce variation." },
  { term: "Detection (FMEA)", module: 15, category: "Quality Tools", definition: "One of three rating dimensions in FMEA. Rates the likelihood that the current detection controls will identify the failure mode before it reaches the customer. Rated 1 (almost certain detection) to 10 (cannot detect). High Detection ratings drive control plan improvements." },
  { term: "DOE", module: 16, category: "Quality Tools", definition: "See Design of Experiments." },

  // E
  { term: "Effective Date", module: 2, category: "Documentation", definition: "The date on which a document revision becomes official and must be followed. Document control requires that all production personnel use only the current effective revision of drawings, procedures, and work instructions." },
  { term: "Effects (FMEA)", module: 15, category: "Quality Tools", definition: "The consequences of a failure mode on the product, process, or customer. FMEA severity ratings are assigned based on the effect of the failure, with safety-related effects rated highest (9-10 on a 1-10 scale)." },

  // F
  { term: "FAI (First Article Inspection)", module: 17, category: "Inspection", definition: "A complete, documented physical and dimensional inspection of the first production part from a new setup, new program, or significant change. Required by AS9102 for defense programs. Demonstrates that the production process can produce conforming parts." },
  { term: "FAIR (First Article Inspection Report)", module: 17, category: "Documentation", definition: "The documentation package resulting from First Article Inspection per AS9102. Consists of three forms: Form 1 (design documentation accountability), Form 2 (material and process verification), and Form 3 (dimensional and functional characteristic accountability with actual values)." },
  { term: "FAR (Federal Acquisition Regulation)", module: 5, category: "Defense", definition: "The primary regulation governing U.S. federal government procurement. Establishes quality, documentation, inspection, and other requirements for all federal contracts. Supplemented for defense by DFARS." },
  { term: "Feature Control Frame", module: 7, category: "GD&T", definition: "The rectangular box on an engineering drawing that contains a complete GD&T specification for a feature. Read left to right: geometric characteristic symbol | tolerance value (with diameter symbol if cylindrical zone) | material condition modifier | datum references." },
  { term: "First Pass Yield (FPY)", module: 25, category: "Quality Metrics", definition: "The percentage of units that complete a process step or the entire production sequence without requiring rework or repair. A key quality and efficiency metric. FPY = (Units completed without rework) / (Total units started)." },
  { term: "FMEA (Failure Mode and Effects Analysis)", module: 15, category: "Quality Tools", definition: "A systematic, proactive method for identifying potential failure modes in a product or process, analyzing their effects, and prioritizing corrective actions based on Risk Priority Number (RPN = Severity Ã Occurrence Ã Detection)." },
  { term: "FOD (Foreign Object Damage/Debris)", module: 4, category: "Quality Systems", definition: "Any substance, debris, or article that could potentially cause damage to aerospace equipment or injury to personnel. AS9100 requires a documented FOD prevention program including inspections, controls, and awareness training." },
  { term: "Form 3 (AS9102)", module: 17, category: "Documentation", definition: "The characteristic accountability section of the First Article Inspection Report. Must list every characteristic on the drawing â every dimension, tolerance, note, and GD&T callout â with the actual measured value. Pass/fail notation alone is not acceptable." },
  { term: "Functional Gauge", module: 18, category: "Inspection", definition: "A gauge designed to check whether a part meets its functional requirements â typically a go/no-go gauge that simulates the mating condition. Faster than variable measurement but provides only accept/reject information without actual values." },

  // G
  { term: "Gauge R&R", module: 13, category: "Metrology", definition: "Gauge Repeatability and Reproducibility â a measurement system analysis study that quantifies variation from the measurement system itself (gauge and operators) relative to total observed variation. Results expressed as %GRR: <10% excellent, 10-30% marginal, >30% unacceptable." },
  { term: "GD&T (Geometric Dimensioning and Tolerancing)", module: 7, category: "GD&T", definition: "A standardized symbolic language (ASME Y14.5) used on engineering drawings to define the geometry, size, and allowable variation of part features. Provides clearer, more complete specifications than coordinate tolerancing alone and directly reflects functional requirements." },
  { term: "Go/No-Go Gauge", module: 18, category: "Inspection", definition: "An attribute gauge with two functional elements: the 'go' end must enter or engage the feature (verifying minimum material condition), and the 'no-go' end must not enter or engage the feature (verifying maximum material condition). Efficient for production inspection." },

  // H
  { term: "Hold Tag", module: 9, category: "Nonconformance", definition: "Physical identification applied to nonconforming material to segregate it from conforming product and prevent inadvertent use or shipment. Required by AS9100 as part of nonconforming product control. Must identify the nature of the nonconformance and the disposition status." },

  // I
  { term: "Incoming Inspection", module: 18, category: "Inspection", definition: "Inspection of purchased material and components upon receipt to verify conformance to purchase order requirements before release to production. Defense programs may require verification of material certifications, special process certs, and dimensional characteristics." },
  { term: "Internal Audit", module: 24, category: "Quality Systems", definition: "A systematic, independent examination of a quality management system against established requirements. Required by AS9100 Clause 9.2. Internal audits verify conformance to requirements, assess implementation effectiveness, and identify improvement opportunities." },
  { term: "ITAR (International Traffic in Arms Regulations)", module: 5, category: "Defense", definition: "U.S. regulations controlling the export and import of defense-related articles, services, and technical data. Defense manufacturers producing parts on the U.S. Munitions List must comply with ITAR, including controlling access by foreign nationals." },
  { term: "ISO 9001", module: 3, category: "Standards", definition: "The international quality management system standard published by ISO. The foundation on which AS9100 is built. Requires documented quality management system, customer focus, risk-based thinking, process approach, and continual improvement across Clauses 4-10." },

  // J
  { term: "Juran Trilogy", module: 1, category: "Quality Management", definition: "Joseph Juran's three-part quality management framework: Quality Planning (establishing quality goals and processes), Quality Control (monitoring processes against goals), and Quality Improvement (achieving breakthrough levels of performance). Still foundational to modern QMS thinking." },

  // K
  { term: "Kaizen", module: 23, category: "Lean", definition: "Japanese term meaning 'change for better' â continuous improvement through small, incremental changes made by everyone in the organization. In manufacturing, kaizen events are structured improvement workshops targeting a specific process area for rapid improvement." },
  { term: "Key Characteristic", module: 4, category: "Quality Planning", definition: "See Characteristic (Key)." },

  // L
  { term: "Lean Manufacturing", module: 23, category: "Lean", definition: "A production philosophy focused on maximizing customer value while minimizing waste. Derived from the Toyota Production System. The eight wastes (DOWNTIME): Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Excess processing." },
  { term: "LCL (Lower Control Limit)", module: 12, category: "SPC", definition: "The lower boundary on a control chart, set at 3 standard deviations below the process mean. Points below the LCL indicate an assignable cause requiring investigation. NOT a specification limit â the LCL is calculated from process data, not customer requirements." },
  { term: "Linearity (Measurement)", module: 13, category: "Metrology", definition: "The consistency of gauge bias across the expected operating range of the measurement device. A gauge may be accurate at one point in its range but biased at others. Linearity studies verify consistent accuracy across the full measurement range." },

  // M
  { term: "Material Review Board (MRB)", module: 9, category: "Nonconformance", definition: "A team (typically including quality, engineering, and program management) that evaluates nonconforming material and determines disposition: use-as-is, rework, repair, scrap, or return to supplier. Defense MRB dispositions may require customer approval." },
  { term: "Material Test Report (MTR)", module: 9, category: "Documentation", definition: "A certification document from a material manufacturer confirming that material composition, mechanical properties, and other characteristics meet the specified requirements. Required objective quality evidence for virtually all defense-program materials." },
  { term: "Maximum Material Condition (MMC)", module: 7, category: "GD&T", definition: "The condition of a feature when it contains the maximum amount of material â largest shaft diameter, smallest hole diameter. Denoted by the symbol â in a feature control frame. Allows bonus tolerance when features depart from MMC." },
  { term: "Measurement System Analysis (MSA)", module: 13, category: "Metrology", definition: "A collection of studies used to evaluate the statistical properties of a measurement system. Includes Gauge R&R (repeatability and reproducibility), bias, linearity, and stability studies. Required by AS9100 and AIAG standards for critical measurement systems." },
  { term: "Minimum Material Condition (LMC)", module: 7, category: "GD&T", definition: "The condition of a feature when it contains the minimum amount of material â smallest shaft diameter, largest hole diameter. Denoted by the symbol â in a feature control frame. Less commonly used than MMC in defense manufacturing." },
  { term: "MSA", module: 13, category: "Metrology", definition: "See Measurement System Analysis." },

  // N
  { term: "NADCAP", module: 19, category: "Special Processes", definition: "National Aerospace and Defense Contractors Accreditation Program. Industry-managed accreditation program for special processes (heat treat, plating, NDT, welding, etc.) used in aerospace and defense manufacturing. NADCAP approval is required by most prime contractors for special process subcontractors." },
  { term: "NDC (Number of Distinct Categories)", module: 13, category: "Metrology", definition: "A measure of a measurement system's ability to distinguish between different parts. Calculated as 1.41 Ã (part variation / gauge variation). A minimum of 5 NDC is required for a measurement system to be considered adequate for process control purposes." },
  { term: "NDT (Non-Destructive Testing)", module: 19, category: "Special Processes", definition: "Inspection techniques that evaluate material or component integrity without damaging the part. Methods include liquid penetrant (PT), magnetic particle (MT), ultrasonic (UT), radiographic (RT), and eddy current (ET). NADCAP certification required for aerospace applications." },
  { term: "Nonconformance", module: 9, category: "Nonconformance", definition: "The failure to fulfill a specified requirement. In manufacturing, a nonconformance occurs when a product characteristic, process parameter, or documentation element does not meet its specified requirement. Must be documented, segregated, and dispositioned per AS9100 Clause 8.7." },
  { term: "Normal Distribution", module: 11, category: "Statistics", definition: "A symmetric, bell-shaped probability distribution described by its mean (Î¼) and standard deviation (Ï). Many natural and manufacturing variation patterns follow a normal distribution. The empirical rule: 68.27% within Â±1Ï, 95.45% within Â±2Ï, 99.73% within Â±3Ï." },

  // O
  { term: "Objective Quality Evidence (OQE)", module: 9, category: "Documentation", definition: "Documented evidence that products or processes conform to specified requirements. In defense manufacturing, OQE must accompany every shipment and include actual measurement values (not pass/fail notation), certifications, and test data." },
  { term: "Occurrence (FMEA)", module: 15, category: "Quality Tools", definition: "One of three rating dimensions in FMEA. Rates the probability that a specific cause will result in the failure mode. Rated 1 (remote probability) to 10 (almost certain). High Occurrence ratings drive process controls and design changes to reduce failure probability." },
  { term: "Out-of-Control Signal", module: 12, category: "SPC", definition: "A pattern on a control chart that indicates the presence of an assignable cause. The most common signals include: one point beyond 3Ï, eight consecutive points on one side of the centerline, six points trending in one direction, and two of three points beyond 2Ï." },

  // P
  { term: "PDCA Cycle", module: 1, category: "Quality Management", definition: "Plan-Do-Check-Act â the iterative improvement cycle developed by Shewhart and popularized by Deming. Plan: identify the problem and plan improvement. Do: implement on a small scale. Check: evaluate results. Act: standardize if successful, or restart the cycle." },
  { term: "PFMEA (Process FMEA)", module: 15, category: "Quality Tools", definition: "Failure Mode and Effects Analysis applied specifically to manufacturing processes. Identifies potential process failure modes (how could the process fail?), their effects on product quality, and prioritizes corrective actions using RPN. The basis for control plan development." },
  { term: "Poka-Yoke", module: 23, category: "Lean", definition: "Japanese for 'mistake-proofing' â a device or process design that prevents errors from occurring or makes errors immediately obvious. The most effective quality control method because it eliminates the possibility of defect rather than detecting it after it occurs." },
  { term: "PPM (Parts Per Million)", module: 11, category: "Statistics", definition: "A measure of defect rate expressing the number of defective units per one million units produced. Common benchmark for defense supply chains. A Cpk of 1.33 (Â±4Ï) corresponds to approximately 63 PPM; Six Sigma corresponds to 3.4 PPM." },
  { term: "Precision", module: 8, category: "Metrology", definition: "The degree of repeatability in a measurement â how consistently a gauge produces the same result when measuring the same feature under the same conditions. Distinguished from accuracy (closeness to true value). A gauge can be precise but inaccurate, or accurate but imprecise." },
  { term: "Prevention Cost", module: 25, category: "Quality Management", definition: "Costs incurred to prevent quality failures from occurring â training, procedure development, PFMEA, poka-yoke design, supplier qualification. Prevention spending is the highest-return quality investment: every $1 in prevention typically saves $10+ in failure costs." },
  { term: "Process Approach", module: 3, category: "Quality Systems", definition: "An ISO 9001/AS9100 requirement to manage activities as interrelated processes. Requires understanding process inputs, outputs, sequence, interactions, and performance metrics. Enables systematic management of quality across organizational boundaries." },

  // Q
  { term: "QAR (Quality Assurance Representative)", module: 6, category: "Defense", definition: "A DCMA employee stationed at or assigned to a defense contractor facility who conducts contract surveillance, reviews quality records, and verifies contractor compliance with quality requirements. The primary government quality interface for most defense manufacturing facilities." },
  { term: "QMS (Quality Management System)", module: 2, category: "Quality Systems", definition: "The collection of policies, processes, procedures, records, and resources that an organization uses to plan, execute, monitor, and improve its quality activities. For defense manufacturers, the QMS must comply with AS9100 Rev D and applicable customer requirements." },

  // R
  { term: "R-Chart (Range Chart)", module: 12, category: "SPC", definition: "A control chart that tracks the range (maximum minus minimum) within subgroups of measurements. Used with the X-bar chart in the X-bar/R pair. Monitors process variability. If the R-chart is out of control, the X-bar chart results are unreliable." },
  { term: "Ra (Roughness Average)", module: 8, category: "Metrology", definition: "The most common surface finish parameter â the arithmetic average of surface profile deviations from the mean line over a sampling length. Measured by contact profilometer. Defense drawings specify Ra in microinches (Î¼in) or micrometers (Î¼m)." },
  { term: "Regression Analysis", module: 16, category: "Statistics", definition: "A statistical method for quantifying the relationship between input variables (X) and output variables (Y). Used in DOE to build predictive models and identify significant process factors. Linear regression models a straight-line relationship; response surface models curved relationships." },
  { term: "Repeatability", module: 13, category: "Metrology", definition: "The variation in measurements taken by one operator using the same gauge on the same part under the same conditions. Called Equipment Variation (EV) in Gauge R&R. Represents the minimum achievable variation for a measurement system." },
  { term: "Reproducibility", module: 13, category: "Metrology", definition: "The variation in measurements taken by different operators using the same gauge on the same parts. Called Appraiser Variation (AV) in Gauge R&R. High reproducibility variation indicates a need for better operator training or measurement procedure standardization." },
  { term: "Risk Priority Number (RPN)", module: 15, category: "Quality Tools", definition: "The product of Severity Ã Occurrence Ã Detection ratings in FMEA. Ranges from 1 to 1000. Used to prioritize which failure modes require corrective action. High-severity failure modes should be addressed regardless of RPN. RPN alone should not be the only prioritization criterion." },
  { term: "Root Cause Analysis (RCA)", module: 14, category: "Quality Tools", definition: "Systematic investigation to identify the fundamental, underlying cause of a nonconformance or quality problem â not just the immediate symptom. Common tools include 5 Whys, fishbone (Ishikawa) diagram, and fault tree analysis. Effective RCA is the foundation of permanent corrective action." },
  { term: "Runout", module: 7, category: "GD&T", definition: "A GD&T characteristic that controls the variation of a surface relative to a datum axis when the part is rotated. Circular runout controls each cross-section independently; total runout controls the entire surface simultaneously. Used for rotating components such as shafts and bearings." },

  // S
  { term: "SCAR (Supplier Corrective Action Request)", module: 21, category: "Supplier Quality", definition: "A formal request to a supplier to investigate and correct a quality problem. Includes the nature of the nonconformance, the affected product, the required response (root cause, corrective action, implementation date). Unresolved SCARs can lead to supplier disqualification." },
  { term: "Severity (FMEA)", module: 15, category: "Quality Tools", definition: "One of three rating dimensions in FMEA. Rates the seriousness of the effect of a failure mode on the customer. Rated 1 (no effect) to 10 (hazardous, no warning). Severity ratings cannot be reduced without product redesign â they are a function of the failure's effect, not its likelihood." },
  { term: "Special Process", module: 19, category: "Special Processes", definition: "A manufacturing process whose output cannot be fully verified by subsequent inspection â the process must be validated to ensure quality. Examples include heat treatment, plating, welding, NDT, and painting. Require NADCAP approval for aerospace/defense applications." },
  { term: "Specification Limit", module: 12, category: "SPC", definition: "The boundary that defines acceptable product â Upper Specification Limit (USL) and Lower Specification Limit (LSL). Defined by the customer or engineering drawing. Distinct from control limits, which are calculated from process data and define process stability, not acceptability." },
  { term: "SPC (Statistical Process Control)", module: 12, category: "SPC", definition: "The use of statistical methods â primarily control charts â to monitor process performance and detect when a process is drifting out of statistical control. SPC shifts quality from detection (inspecting bad parts) to prevention (catching process drift before it produces bad parts)." },
  { term: "Standard Deviation (Ï)", module: 11, category: "Statistics", definition: "A measure of the spread or dispersion of a data set. Calculated as the square root of variance. In SPC, control limits are set at Â±3Ï from the process mean. Process capability indices (Cp, Cpk) use Ï to quantify how well the process fits within specification limits." },
  { term: "Standard Work", module: 23, category: "Lean", definition: "A documented description of the most efficient method for performing a task, defining sequence, time, and standard inventory. The foundation of lean manufacturing and quality consistency â without standard work, there is no baseline from which to improve." },
  { term: "Statistical Tolerance", module: 11, category: "Statistics", definition: "A tolerance assigned based on the statistical distribution of assembly variation rather than worst-case arithmetic stackup. Allows tighter individual component tolerances to achieve a specified assembly tolerance probability, reflecting the reality that worst-case rarely occurs simultaneously." },
  { term: "Supplier Qualification", module: 21, category: "Supplier Quality", definition: "The process of evaluating and approving a supplier before they are added to the Approved Supplier List (ASL). Includes assessment of quality management system, technical capability, financial stability, and compliance with applicable requirements including AS9100 and DFARS." },
  { term: "Surface Integrity", module: 18, category: "Inspection", definition: "The condition of a machined surface beyond visual appearance â including surface finish (Ra), residual stress, microstructure alteration, and work hardening. Critical for fatigue life of aerospace components. Affected by cutting parameters, tool condition, and coolant." },

  // T
  { term: "Tolerance", module: 7, category: "GD&T", definition: "The total allowable variation in a dimension or geometric characteristic. Tolerance = Upper Limit â Lower Limit. Tighter tolerances increase manufacturing difficulty and cost. GD&T allows tolerances to be defined functionally rather than arbitrarily, often resulting in more cost-effective manufacturing." },
  { term: "Traceability", module: 9, category: "Documentation", definition: "The ability to trace the history, application, and location of a product through recorded identification. In defense manufacturing, full traceability means being able to trace a delivered part back through every operation, operator, material lot, and supplier in its production history." },
  { term: "True Position", module: 7, category: "GD&T", definition: "A GD&T location tolerance (â) that controls the location of a feature's axis or center plane relative to a datum reference frame. The most widely used GD&T symbol in manufacturing. Can use a cylindrical tolerance zone (more usable tolerance than coordinate tolerancing)." },

  // U
  { term: "UCL (Upper Control Limit)", module: 12, category: "SPC", definition: "The upper boundary on a control chart, set at 3 standard deviations above the process mean. Points above the UCL indicate an assignable cause requiring investigation. NOT a specification limit â the UCL is calculated from process data, not customer requirements." },
  { term: "Use-As-Is", module: 9, category: "Nonconformance", definition: "A nonconforming material disposition that allows the part to be used in its current nonconforming condition without rework. Requires engineering analysis confirming the nonconformance does not affect form, fit, function, or safety. Defense programs often require customer approval for use-as-is dispositions." },

  // V
  { term: "Value Stream Mapping", module: 23, category: "Lean", definition: "A lean tool that visually maps the flow of materials and information from raw material to delivered product. Identifies waste (non-value-added activities) in the production process. Used to design the future-state ideal process and plan improvement activities." },
  { term: "Variable Data", module: 11, category: "Statistics", definition: "Measurement data on a continuous scale â actual dimensional values, temperatures, weights. More information-rich than attribute data. Used in X-bar/R charts, I-MR charts, and capability analysis. Required for SPC on key characteristics in defense manufacturing." },
  { term: "Verification vs. Validation", module: 3, category: "Quality Systems", definition: "Verification confirms that a product meets its specified requirements (Did we build it right?). Validation confirms that a product meets the intended use or application (Did we build the right thing?). Both are required by AS9100, though validation requirements are most relevant to design activities." },

  // W
  { term: "Western Electric Rules", module: 12, category: "SPC", definition: "Eight rules for detecting non-random patterns on control charts that indicate assignable causes even when no points exceed the control limits. Include tests for runs, trends, hugging, and alternating patterns. Most statistical software implements these rules automatically." },

  // X
  { term: "X-bar Chart", module: 12, category: "SPC", definition: "A control chart that tracks the average (mean) of subgroups of measurements over time. Used with the R-chart (range) or S-chart (standard deviation) to monitor both the process mean and variability simultaneously. Standard tool for monitoring key characteristics in machining." },

  // Z
  { term: "Zero Defects", module: 1, category: "Quality Management", definition: "Philip Crosby's quality philosophy that the performance standard for quality is zero defects â not an acceptable defect level. The cost of quality errors always exceeds the cost of prevention. Motivational standard that shifts thinking from acceptable defect rates to absolute conformance." },
];

const CATEGORIES = [...new Set(TERMS.map(t => t.category))].sort();

export default function Glossary() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const filtered = TERMS.filter(t => {
    const matchesSearch = search === '' ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by first letter
  const grouped = filtered.reduce((acc, t) => {
    const letter = t.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(t);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <div className="glossary-shell">
      <header className="mv-header">
        <div className="mv-header-left">
          <Link to="/" className="mv-back">â DASHBOARD</Link>
          <div className="mv-header-divider" />
          <span className="mv-header-module">GLOSSARY</span>
        </div>
        <div className="mv-header-right">
          <span className="mv-header-name">{user?.name?.toUpperCase()}</span>
          <div className="mv-avatar" onClick={logout} title="Sign Out">{initials}</div>
        </div>
      </header>

      <div className="mv-accent-rule" />

      <div className="glossary-body">

        {/* ââ SIDEBAR ââ */}
        <nav className="glossary-sidebar">
          <div className="glossary-sidebar-top">
            <div className="mv-sidebar-label">REFERENCE</div>
            <div className="mv-sidebar-title">QUALITY MANAGEMENT GLOSSARY</div>
            <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-mid)' }}>
              {TERMS.length} terms across 26 modules
            </div>
          </div>

          <div className="glossary-search-wrap">
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="glossary-search"
            />
          </div>

          <div className="glossary-categories">
            <div className="mv-sidebar-label" style={{ padding: '12px 16px 6px' }}>FILTER BY CATEGORY</div>
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`glossary-cat-btn ${activeCategory === cat ? 'glossary-cat-btn--active' : ''}`}
              >
                {cat}
                <span className="glossary-cat-count">
                  {cat === 'All' ? TERMS.length : TERMS.filter(t => t.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Letter jump nav */}
          <div className="glossary-letter-nav">
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`} className="glossary-letter-link">{l}</a>
            ))}
          </div>
        </nav>

        {/* ââ MAIN ââ */}
        <main className="glossary-main">
          <div className="glossary-header-bar">
            <h1 className="glossary-title">Quality Management Glossary</h1>
            <p className="glossary-subtitle">
              {filtered.length} term{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {search ? ` matching "${search}"` : ''}
            </p>
          </div>

          {letters.length === 0 && (
            <div className="glossary-empty">No terms found for your search.</div>
          )}

          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`} className="glossary-letter-section">
              <div className="glossary-letter-heading">{letter}</div>
              {grouped[letter].map((t, i) => (
                <div key={i} className="glossary-term-card">
                  <div className="glossary-term-header">
                    <span className="glossary-term-name">{t.term}</span>
                    <div className="glossary-term-meta">
                      <span className="glossary-term-category">{t.category}</span>
                      <Link to={`/module/${t.module}`} className="glossary-term-module">
                        Module {String(t.module).padStart(2, '0')}
                      </Link>
                    </div>
                  </div>
                  <p className="glossary-term-definition">{t.definition}</p>
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
