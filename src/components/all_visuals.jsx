// ============================================================
// CAMCO QUALITY MANAGER TRAINING — ALL MODULE VISUALS
// ============================================================
// Paste this entire file into Claude Code with the instruction:
// "Add all these visual components to the training portal.
//  Each component maps to its module number. Embed each one
//  inside the corresponding module lesson page after the main
//  instructional text. All components are self-contained."
// ============================================================

import { useState, useCallback, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ScatterChart,
  Scatter, ZAxis
} from "recharts";

// ─────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────
const S = {
  card: { background:"#1e293b", borderRadius:12, padding:20, border:"1px solid #334155", marginBottom:16 },
  badge: (color) => ({ background:color+"20", border:`1px solid ${color}40`, borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:700, letterSpacing:2, color }),
  h1: { margin:0, fontSize:20, fontWeight:700, color:"#f8fafc", letterSpacing:-0.5 },
  label: { fontSize:11, color:"#64748b", letterSpacing:1, textTransform:"uppercase", marginBottom:8 },
  pill: (color, bg) => ({ background:bg||color+"15", border:`1px solid ${color}40`, borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700, color }),
};
const DARK = "#0f172a";
const wrap = (content) => (
  <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"linear-gradient(135deg,#0a0f1e,#0f172a)", minHeight:"100vh", padding:24, color:"#f1f5f9" }}>
    {content}
  </div>
);


// ─────────────────────────────────────────────
// MODULE 1 — Quality Philosophy Timeline
// ─────────────────────────────────────────────
export function Module01_QualityTimeline() {
  const [active, setActive] = useState(null);
  const events = [
    { year:1920, name:"Shewhart", title:"Statistical Control", color:"#3b82f6", desc:"Walter Shewhart develops control charts at Bell Labs — the foundation of SPC. Introduces PDCA cycle." },
    { year:1950, name:"Deming", title:"14 Principles", color:"#8b5cf6", desc:"W. Edwards Deming introduces statistical methods to Japan. His 14 principles transform Toyota and launch TQM." },
    { year:1954, name:"Juran", title:"Quality Trilogy", color:"#10b981", desc:"Joseph Juran defines quality planning, quality control, and quality improvement as an integrated management system." },
    { year:1979, name:"Crosby", title:"Zero Defects", color:"#f59e0b", desc:"Philip Crosby publishes 'Quality is Free' — argues prevention costs less than failure. Zero defects as a goal." },
    { year:1987, name:"ISO 9001", title:"Global Standard", color:"#ef4444", desc:"First ISO 9001 published. Quality management systems become globally standardized and auditable." },
    { year:2000, name:"AS9100", title:"Aerospace QMS", color:"#06b6d4", desc:"AS9100 launched for aerospace/defense. Adds configuration management, key characteristics, FOD prevention to ISO 9001." },
    { year:2015, name:"Risk-Based", title:"ISO 9001:2015", color:"#f97316", desc:"ISO 9001 revision introduces risk-based thinking, context of organization, and removes preventive action as separate clause." },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#3b82f6")}>MODULE 1</span>
      <h1 style={{...S.h1,marginTop:8}}>History of Quality Management</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Click any milestone to explore its significance</p>
    </div>
    <div style={S.card}>
      <div style={{position:"relative",paddingTop:40}}>
        <div style={{position:"absolute",top:60,left:20,right:20,height:3,background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#10b981,#f59e0b,#ef4444,#06b6d4,#f97316)",borderRadius:2}}/>
        <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
          {events.map((e,i) => (
            <div key={i} onClick={()=>setActive(active===i?null:i)} style={{display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",width:110}}>
              <div style={{fontSize:11,fontWeight:700,color:e.color,marginBottom:6}}>{e.year}</div>
              <div style={{width:16,height:16,borderRadius:"50%",background:e.color,border:"3px solid #0f172a",boxShadow:`0 0 12px ${e.color}60`,zIndex:1,transition:"transform 0.2s",transform:active===i?"scale(1.5)":"scale(1)"}}/>
              <div style={{marginTop:8,fontSize:11,fontWeight:700,color:active===i?e.color:"#94a3b8",textAlign:"center"}}>{e.name}</div>
              <div style={{fontSize:10,color:"#475569",textAlign:"center"}}>{e.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {active!==null && (
      <div style={{...S.card,border:`1px solid ${events[active].color}50`,background:"#1e293b"}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:48,height:48,borderRadius:10,background:events[active].color+"20",border:`1px solid ${events[active].color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:events[active].color,flexShrink:0}}>{events[active].year}</div>
          <div>
            <h3 style={{margin:"0 0 4px",color:"#f8fafc"}}>{events[active].name} — {events[active].title}</h3>
            <p style={{margin:0,color:"#94a3b8",fontSize:14,lineHeight:1.6}}>{events[active].desc}</p>
          </div>
        </div>
      </div>
    )}
    <div style={S.card}>
      <div style={S.label}>Deming's 14 Principles — Quick Reference</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
        {["Create constancy of purpose","Adopt the new philosophy","Cease dependence on inspection","End lowest-tender contracts","Improve constantly","Institute training on the job","Institute leadership","Drive out fear","Break down department barriers","Eliminate slogans","Eliminate management by numbers","Remove barriers to pride in work","Institute education & self-improvement","Put everyone to work on transformation"].map((p,i)=>(
          <div key={i} style={{display:"flex",gap:8,padding:"8px 10px",background:DARK,borderRadius:6,border:"1px solid #1e293b"}}>
            <span style={{color:"#3b82f6",fontWeight:700,fontSize:12,minWidth:18}}>{i+1}.</span>
            <span style={{fontSize:12,color:"#94a3b8",lineHeight:1.4}}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 2 — QMS Document Hierarchy
// ─────────────────────────────────────────────
export function Module02_QMSHierarchy() {
  const [active, setActive] = useState(null);
  const levels = [
    { level:"Level 1", title:"Quality Manual / Policy", color:"#ef4444", width:"40%", desc:"Sets the organization's quality policy, objectives, and commitment. References the QMS structure. Required by ISO 9001/AS9100.", examples:["Quality Policy Statement","Quality Manual","Management Review Minutes"] },
    { level:"Level 2", title:"Procedures", color:"#f97316", width:"60%", desc:"Describes WHO does WHAT and WHEN. Cross-departmental processes. Written at department manager level.", examples:["Document Control Procedure","CAPA Procedure","Internal Audit Procedure","Nonconformance Procedure"] },
    { level:"Level 3", title:"Work Instructions", color:"#f59e0b", width:"75%", desc:"Step-by-step HOW TO. Written for the operator/inspector. Must be at the point of use.", examples:["CMM Setup Instruction","First Piece Inspection Checklist","Gauge Calibration WI","8D Problem Solving Form"] },
    { level:"Level 4", title:"Records & Forms", color:"#10b981", width:"90%", desc:"Objective Quality Evidence (OQE). Proof that the QMS is working. Must be retained per contract requirements.", examples:["Inspection Reports","Calibration Records","Training Records","FAIRs","Certificates of Conformance"] },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#10b981")}>MODULE 2</span>
      <h1 style={{...S.h1,marginTop:8}}>QMS Documentation Hierarchy</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Click each level to see requirements and examples</p>
    </div>
    <div style={S.card}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 0"}}>
        {levels.map((l,i)=>(
          <div key={i} onClick={()=>setActive(active===i?null:i)}
            style={{width:l.width,background:active===i?l.color+"30":l.color+"15",border:`2px solid ${active===i?l.color:l.color+"50"}`,borderRadius:8,padding:"12px 20px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}}>
            <div style={{fontSize:10,color:l.color,fontWeight:700,letterSpacing:1}}>{l.level}</div>
            <div style={{fontSize:14,fontWeight:700,color:"#f8fafc",marginTop:2}}>{l.title}</div>
          </div>
        ))}
      </div>
    </div>
    {active!==null && (
      <div style={{...S.card,border:`1px solid ${levels[active].color}40`}}>
        <div style={{fontSize:11,color:levels[active].color,fontWeight:700,letterSpacing:1,marginBottom:8}}>{levels[active].level} — {levels[active].title}</div>
        <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.6,margin:"0 0 12px"}}>{levels[active].desc}</p>
        <div style={S.label}>Example Documents</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {levels[active].examples.map((e,i)=>(
            <span key={i} style={S.pill(levels[active].color)}>{e}</span>
          ))}
        </div>
      </div>
    )}
  </>);
}


// ─────────────────────────────────────────────
// MODULE 3 — ISO 9001 Clause Map
// ─────────────────────────────────────────────
export function Module03_ISO9001Clauses() {
  const [active, setActive] = useState(null);
  const clauses = [
    { num:"4", title:"Context of the Organization", color:"#3b82f6", req:"Understand internal/external issues, interested parties, QMS scope", key:"Clause 4 establishes WHY the QMS exists and what it covers." },
    { num:"5", title:"Leadership", color:"#8b5cf6", req:"Top management commitment, quality policy, organizational roles", key:"Management must personally drive quality — cannot delegate accountability." },
    { num:"6", title:"Planning", color:"#10b981", req:"Risk-based thinking, quality objectives, planning for changes", key:"Replace preventive action with proactive risk identification upfront." },
    { num:"7", title:"Support", color:"#f59e0b", req:"Resources, competence, awareness, communication, documented info", key:"Document control and records management live here." },
    { num:"8", title:"Operation", color:"#ef4444", req:"Operational planning, customer requirements, design, production control", key:"The 'doing' clause — where manufacturing quality controls are defined." },
    { num:"9", title:"Performance Evaluation", color:"#06b6d4", req:"Monitoring, measurement, internal audit, management review", key:"How you know the QMS is working — data-driven evaluation." },
    { num:"10", title:"Improvement", color:"#f97316", req:"Nonconformity, corrective action, continual improvement", key:"Close the PDCA loop — every problem drives permanent improvement." },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#3b82f6")}>MODULE 3</span>
      <h1 style={{...S.h1,marginTop:8}}>ISO 9001:2015 Clause Structure</h1>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
      {clauses.map((c,i)=>(
        <div key={i} onClick={()=>setActive(active===i?null:i)}
          style={{...S.card,marginBottom:0,cursor:"pointer",border:`1px solid ${active===i?c.color:"#334155"}`,background:active===i?c.color+"15":"#1e293b",transition:"all 0.2s"}}>
          <div style={{fontSize:28,fontWeight:800,color:c.color,marginBottom:4}}>§{c.num}</div>
          <div style={{fontSize:12,fontWeight:700,color:"#f1f5f9",lineHeight:1.3}}>{c.title}</div>
        </div>
      ))}
    </div>
    {active!==null && (
      <div style={{...S.card,border:`1px solid ${clauses[active].color}50`}}>
        <div style={{fontSize:11,color:clauses[active].color,fontWeight:700,letterSpacing:1,marginBottom:8}}>CLAUSE {clauses[active].num} — {clauses[active].title.toUpperCase()}</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:10}}><strong style={{color:"#f1f5f9"}}>Requirements: </strong>{clauses[active].req}</div>
        <div style={{padding:"10px 14px",background:DARK,borderRadius:8,border:`1px solid ${clauses[active].color}30`,fontSize:13,color:"#f1f5f9"}}>
          💡 <strong>Key insight: </strong>{clauses[active].key}
        </div>
      </div>
    )}
  </>);
}


// ─────────────────────────────────────────────
// MODULE 4 — AS9100 vs ISO 9001 Delta
// ─────────────────────────────────────────────
export function Module04_AS9100Delta() {
  const [filter, setFilter] = useState("all");
  const deltas = [
    { topic:"Configuration Management", type:"added", impact:"High", desc:"AS9100 requires formal configuration management — controlling part numbers, revisions, and changes throughout the product lifecycle." },
    { topic:"Key Characteristics", type:"added", impact:"High", desc:"Must identify and specially control features critical to fit, form, function, or safety. Requires enhanced inspection and SPC." },
    { topic:"FOD Prevention", type:"added", impact:"High", desc:"Foreign Object Damage prevention program required. Inspections, controls, and documentation of FOD checks." },
    { topic:"First Article Inspection", type:"added", impact:"High", desc:"AS9102 FAIR required for new parts, changes, or production lapses. All three forms must be completed and customer-approved." },
    { topic:"Operational Risk Management", type:"enhanced", impact:"High", desc:"More rigorous than ISO 9001 — must address product safety, counterfeit parts, and human factors in aerospace context." },
    { topic:"Customer Flow-Down", type:"enhanced", impact:"High", desc:"All applicable customer and regulatory requirements must flow down through the supply chain systematically." },
    { topic:"Product/Process Validation", type:"enhanced", impact:"Med", desc:"Special processes must be validated and revalidated. NADCAP certification required for certain special processes." },
    { topic:"Record Retention", type:"enhanced", impact:"Med", desc:"AS9100 records must be retained longer than commercial — often life of the aircraft plus additional years per contract." },
    { topic:"Competency Requirements", type:"enhanced", impact:"Med", desc:"Personnel affecting quality must be qualified against specific criteria. More formal than ISO 9001 expectations." },
    { topic:"Supplier Control", type:"enhanced", impact:"High", desc:"AS9100 requires more rigorous supplier qualification, flow-down of requirements, and monitoring than ISO 9001." },
  ];
  const filtered = filter==="all" ? deltas : deltas.filter(d=>d.type===filter);
  const colors = { added:"#ef4444", enhanced:"#f59e0b" };
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#06b6d4")}>MODULE 4</span>
      <h1 style={{...S.h1,marginTop:8}}>AS9100 — What's Added Beyond ISO 9001</h1>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      {["all","added","enhanced"].map(f=>(
        <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"#1d4ed820":"#1e293b",border:`1px solid ${filter===f?"#3b82f6":"#334155"}`,borderRadius:6,padding:"6px 14px",color:filter===f?"#60a5fa":"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{f==="all"?"All Requirements":f==="added"?"New in AS9100":"Enhanced from ISO"}</button>
      ))}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map((d,i)=>(
        <div key={i} style={{...S.card,marginBottom:0,display:"flex",gap:12,alignItems:"flex-start"}}>
          <span style={{...S.pill(colors[d.type]),flexShrink:0,marginTop:2}}>{d.type==="added"?"NEW":"ENHANCED"}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#f8fafc",marginBottom:4}}>{d.topic}</div>
            <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.5}}>{d.desc}</div>
          </div>
          <span style={{...S.pill(d.impact==="High"?"#ef4444":"#f59e0b"),flexShrink:0,fontSize:10}}>{d.impact} Impact</span>
        </div>
      ))}
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 5 — Defense Contracting Flow-Down
// ─────────────────────────────────────────────
export function Module05_DefenseFlowDown() {
  const [step, setStep] = useState(0);
  const chain = [
    { entity:"DoD / Government", color:"#ef4444", icon:"🏛️", reqs:["DFARS clauses","MIL-STD requirements","ITAR controls","FAR quality clauses","DCMA oversight rights"] },
    { entity:"Prime Contractor (e.g. DRS Technologies)", color:"#f97316", icon:"🏭", reqs:["AS9100 Rev D compliance","FAIR per AS9102","OQE with each shipment","Certificate of Conformance","Counterfeit parts prevention (AS5553)"] },
    { entity:"CAMCO Manufacturing", color:"#3b82f6", icon:"🔧", reqs:["Flow down all applicable requirements","Special process NADCAP approval","Lot traceability documentation","CMM inspection records","COC on every shipment"] },
    { entity:"CAMCO Suppliers", color:"#10b981", icon:"📦", reqs:["SCAR response required","AS9100 or equivalent","Special process certs (NADCAP)","Material certifications","CoC flow-through"] },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#ef4444")}>MODULE 5</span>
      <h1 style={{...S.h1,marginTop:8}}>Defense Contract Quality Flow-Down</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Requirements cascade from government through every tier</p>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:16}}>
      {chain.map((c,i)=>(
        <div key={i}>
          <div onClick={()=>setStep(step===i?-1:i)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:step===i?c.color+"20":"#1e293b",border:`1px solid ${step===i?c.color:"#334155"}`,borderRadius:10,cursor:"pointer",transition:"all 0.2s"}}>
            <span style={{fontSize:24}}>{c.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:step===i?c.color:"#f1f5f9",fontSize:15}}>{c.entity}</div>
              <div style={{fontSize:11,color:"#64748b"}}>Tier {i+1} — click to see requirements</div>
            </div>
            <span style={{color:"#475569",fontSize:18}}>{step===i?"▼":"▶"}</span>
          </div>
          {step===i && (
            <div style={{background:DARK,border:`1px solid ${c.color}30`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"12px 18px",display:"flex",flexWrap:"wrap",gap:8}}>
              {c.reqs.map((r,j)=>(<span key={j} style={S.pill(c.color)}>{r}</span>))}
            </div>
          )}
          {i<chain.length-1 && <div style={{textAlign:"center",fontSize:18,color:"#334155",margin:"2px 0"}}>↓</div>}
        </div>
      ))}
    </div>
    <div style={{...S.card,background:"#1a0505",border:"1px solid #ef444440"}}>
      <div style={{fontSize:11,color:"#ef4444",fontWeight:700,letterSpacing:1,marginBottom:8}}>⚠ COUNTERFEIT PARTS — KEY REQUIREMENT</div>
      <p style={{fontSize:13,color:"#fca5a5",margin:0,lineHeight:1.6}}>AS5553 (electronic) and AS6174 (non-electronic) require a documented counterfeit parts prevention program. Only purchase from OEMs, authorized distributors, or franchised dealers. Certificate of conformance alone is NOT sufficient traceability for defense parts.</p>
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 7 — GD&T Symbol Reference
// ─────────────────────────────────────────────
export function Module07_GDT() {
  const [active, setActive] = useState(null);
  const symbols = [
    { sym:"—", name:"Straightness", cat:"Form", color:"#3b82f6", desc:"Controls how straight a line or axis is. No datum required.", example:"Shaft axis must be straight within 0.005\"" },
    { sym:"□", name:"Flatness", cat:"Form", color:"#3b82f6", desc:"Controls surface flatness — must lie between two parallel planes. No datum required.", example:"Mating surface flat within 0.002\"" },
    { sym:"○", name:"Circularity", cat:"Form", color:"#3b82f6", desc:"Controls roundness of each cross-section of a cylinder or cone. No datum required.", example:"Each cross-section must be round within 0.001\"" },
    { sym:"⌭", name:"Cylindricity", cat:"Form", color:"#3b82f6", desc:"Controls both roundness AND straightness of a cylinder simultaneously.", example:"Bearing journal cylindrical within 0.0005\"" },
    { sym:"⌒", name:"Profile of Line", cat:"Profile", color:"#8b5cf6", desc:"Controls 2D cross-section profile. Can be applied with or without datum.", example:"Contour profile within 0.010\" bilateral" },
    { sym:"⌓", name:"Profile of Surface", cat:"Profile", color:"#8b5cf6", desc:"Controls 3D surface profile — most powerful GD&T control.", example:"Aerodynamic surface within 0.020\" all around" },
    { sym:"∠", name:"Angularity", cat:"Orientation", color:"#10b981", desc:"Controls angle of a surface or axis relative to a datum. Requires datum.", example:"Angled face at 30° ±0.5° to datum A" },
    { sym:"⊥", name:"Perpendicularity", cat:"Orientation", color:"#10b981", desc:"Controls 90° relationship to a datum. Most common orientation control.", example:"Bore axis perpendicular to datum A within 0.001\"" },
    { sym:"∥", name:"Parallelism", cat:"Orientation", color:"#10b981", desc:"Controls parallel relationship to a datum. Requires datum.", example:"Rail surface parallel to datum A within 0.003\"" },
    { sym:"⊕", name:"True Position", cat:"Location", color:"#ef4444", desc:"Controls location of features relative to datums. Most widely used GD&T symbol in manufacturing.", example:"Hole pattern located within ⌀0.014\" at MMC to datums A|B|C" },
    { sym:"◎", name:"Concentricity", cat:"Location", color:"#ef4444", desc:"Controls median points of a cylinder to a datum axis. Very difficult to measure — usually replaced by runout.", example:"Inner diameter concentric to OD within 0.002\"" },
    { sym:"⌖", name:"Symmetry", cat:"Location", color:"#ef4444", desc:"Controls median plane symmetry. Rarely used — typically replaced by position.", example:"Slot symmetric about datum A within 0.004\"" },
    { sym:"↗", name:"Circular Runout", cat:"Runout", color:"#f59e0b", desc:"Controls each cross-section independently when rotated about datum axis.", example:"Circular runout 0.002\" to datum A-B" },
    { sym:"⟲", name:"Total Runout", cat:"Runout", color:"#f59e0b", desc:"Controls entire surface simultaneously — most stringent runout control.", example:"Total runout 0.005\" to datum A" },
  ];
  const cats = ["Form","Profile","Orientation","Location","Runout"];
  const catColors = { Form:"#3b82f6",Profile:"#8b5cf6",Orientation:"#10b981",Location:"#ef4444",Runout:"#f59e0b" };
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#f59e0b")}>MODULE 7</span>
      <h1 style={{...S.h1,marginTop:8}}>GD&T Symbol Reference — ASME Y14.5</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Click any symbol to see definition, requirements, and inspection approach</p>
    </div>
    {cats.map(cat=>(
      <div key={cat} style={{marginBottom:16}}>
        <div style={{...S.label,color:catColors[cat]}}>{cat} Controls</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {symbols.filter(s=>s.cat===cat).map((s,i)=>(
            <div key={i} onClick={()=>setActive(active?.name===s.name?null:s)}
              style={{...S.card,marginBottom:0,cursor:"pointer",border:`1px solid ${active?.name===s.name?s.color:"#334155"}`,background:active?.name===s.name?s.color+"15":"#1e293b",textAlign:"center",transition:"all 0.2s"}}>
              <div style={{fontSize:28,margin:"4px 0 6px",color:s.color}}>{s.sym}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#f1f5f9"}}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
    {active && (
      <div style={{...S.card,border:`1px solid ${active.color}50`,position:"sticky",bottom:16}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{fontSize:40,color:active.color,minWidth:48,textAlign:"center"}}>{active.sym}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:active.color,fontWeight:700,letterSpacing:1,marginBottom:4}}>{active.cat.toUpperCase()} CONTROL</div>
            <h3 style={{margin:"0 0 6px",color:"#f8fafc"}}>{active.name}</h3>
            <p style={{margin:"0 0 8px",color:"#94a3b8",fontSize:13,lineHeight:1.5}}>{active.desc}</p>
            <div style={{padding:"8px 12px",background:DARK,borderRadius:6,fontSize:12,color:"#60a5fa"}}>
              📐 Example: {active.example}
            </div>
          </div>
        </div>
      </div>
    )}
  </>);
}


// ─────────────────────────────────────────────
// MODULE 8 — Metrology Tool Selector
// ─────────────────────────────────────────────
export function Module08_Metrology() {
  const [feature, setFeature] = useState(null);
  const features = [
    { name:"OD / ID diameter", tools:["Micrometer (OD)","Bore gauge (ID)","CMM","Plug gauge (ID)","Ring gauge (OD)"], tolerance:"Any", notes:"For tight tolerances (<0.001\"), use micrometer or CMM. Go/no-go gauges fastest for production." },
    { name:"Length / depth", tools:["Calipers","Height gauge + surface plate","CMM","Depth micrometer"], tolerance:"±0.001\" and up", notes:"Calipers adequate for ±0.010\"+. Micrometer needed below ±0.002\". CMM for complex relationships." },
    { name:"Thread", tools:["Go/No-Go thread gauge","Optical comparator","CMM with thread cycle","Thread micrometer"], tolerance:"Class 2B/3B", notes:"Go/No-go gauges verify functional fit. Optical comparator verifies thread form and pitch." },
    { name:"Surface finish (Ra)", tools:["Contact profilometer","Non-contact profilometer","Comparison specimens"], tolerance:"Per callout", notes:"Profilometer gives actual Ra value. Comparison specimens ok for rough screening only." },
    { name:"Flatness / Form", tools:["Surface plate + height gauge","CMM","Optical flat (very tight)","Granite straight edge"], tolerance:"<0.001\"", notes:"Surface plate is the foundation of all metrology. Must be certified and maintained at 68°F." },
    { name:"Angle", tools:["Sine bar","CMM","Protractor (rough)","Optical comparator"], tolerance:"±0.1° and tighter", notes:"Sine bar is the precision standard. CMM most flexible. Protractor only for ±0.5°+ tolerance." },
    { name:"True position", tools:["CMM (only reliable method)","Optical comparator (limited)"], tolerance:"<0.010\"", notes:"CMM with correct datum setup is the standard. Must establish datum reference frame correctly in CMM program." },
    { name:"Hardness", tools:["Rockwell tester","Vickers microhardness","Brinell (large parts)"], tolerance:"Per spec", notes:"Rockwell most common for production. Vickers for case depth, thin sections. Always verify tester calibration." },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#06b6d4")}>MODULE 8</span>
      <h1 style={{...S.h1,marginTop:8}}>Metrology Tool Selection Guide</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Select a feature type to see recommended measurement tools</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
      {features.map((f,i)=>(
        <div key={i} onClick={()=>setFeature(feature===i?null:i)}
          style={{...S.card,marginBottom:0,cursor:"pointer",border:`1px solid ${feature===i?"#06b6d4":"#334155"}`,background:feature===i?"#06b6d420":"#1e293b",transition:"all 0.2s"}}>
          <div style={{fontSize:13,fontWeight:700,color:feature===i?"#06b6d4":"#f1f5f9"}}>{f.name}</div>
          <div style={{fontSize:11,color:"#475569",marginTop:2}}>{f.tools.length} tools available</div>
        </div>
      ))}
    </div>
    {feature!==null && (
      <div style={{...S.card,border:"1px solid #06b6d440"}}>
        <div style={{fontSize:11,color:"#06b6d4",fontWeight:700,letterSpacing:1,marginBottom:10}}>RECOMMENDED TOOLS — {features[feature].name.toUpperCase()}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
          {features[feature].tools.map((t,i)=>(
            <span key={i} style={{...S.pill("#06b6d4"),fontSize:12,padding:"6px 14px"}}>{t}</span>
          ))}
        </div>
        <div style={{padding:"10px 14px",background:DARK,borderRadius:8,fontSize:13,color:"#94a3b8",lineHeight:1.6}}>
          💡 {features[feature].notes}
        </div>
      </div>
    )}
    <div style={{...S.card,border:"1px solid #334155"}}>
      <div style={S.label}>Gage Lab Environment Standards</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {[
          { param:"Temperature", value:"68°F ± 2°F", note:"Steel expands 6.5µin/in/°F" },
          { param:"Humidity", value:"45-55% RH", note:"Prevents rust and gauge drift" },
          { param:"Vibration", value:"Isolated", note:"CMM must be on isolation mount" },
        ].map((e,i)=>(
          <div key={i} style={{background:DARK,borderRadius:8,padding:"12px 14px",border:"1px solid #1e293b"}}>
            <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{e.param}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#06b6d4",marginBottom:4}}>{e.value}</div>
            <div style={{fontSize:11,color:"#475569"}}>{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 11 — Normal Distribution Bell Curve
// ─────────────────────────────────────────────
export function Module11_Statistics() {
  const [sigma, setSigma] = useState(1);
  const mean = 0;
  const normal = (x, m, s) => (1/(s*Math.sqrt(2*Math.PI)))*Math.exp(-0.5*((x-m)/s)**2);
  const data = Array.from({length:121},(_,i)=>{
    const x = -3 + i*0.05;
    return { x:parseFloat(x.toFixed(2)), y:parseFloat(normal(x,mean,1).toFixed(4)) };
  });
  const zones = [
    { label:"68.27%", range:"±1σ", color:"#3b82f6", from:-1, to:1 },
    { label:"95.45%", range:"±2σ", color:"#8b5cf6", from:-2, to:2 },
    { label:"99.73%", range:"±3σ", color:"#10b981", from:-3, to:3 },
  ];
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#8b5cf6")}>MODULE 11</span>
      <h1 style={{...S.h1,marginTop:8}}>Normal Distribution & the Empirical Rule</h1>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
      {zones.map((z,i)=>(
        <div key={i} style={{...S.card,marginBottom:0,textAlign:"center",border:`1px solid ${z.color}40`}}>
          <div style={{fontSize:28,fontWeight:800,color:z.color}}>{z.label}</div>
          <div style={{fontSize:13,color:"#94a3b8"}}>of data within</div>
          <div style={{fontSize:16,fontWeight:700,color:"#f1f5f9"}}>{z.range}</div>
        </div>
      ))}
    </div>
    <div style={S.card}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="0%">
          <XAxis dataKey="x" tick={{fill:"#64748b",fontSize:10}} tickFormatter={v=>v%1===0?`${v}σ`:""} />
          <YAxis hide />
          <Bar dataKey="y" radius={0}>
            {data.map((d,i)=>(
              <Cell key={i} fill={Math.abs(d.x)<=1?"#3b82f6":Math.abs(d.x)<=2?"#8b5cf6":Math.abs(d.x)<=3?"#10b981":"#1e293b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:8}}>
        {[["#3b82f6","Within ±1σ"],["#8b5cf6","Within ±2σ"],["#10b981","Within ±3σ"]].map(([c,l])=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#64748b"}}>
            <div style={{width:10,height:10,background:c,borderRadius:2}}/>{l}
          </div>
        ))}
      </div>
    </div>
    <div style={S.card}>
      <div style={S.label}>Application to Manufacturing</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
        {[
          { title:"Cpk = 1.00", note:"±3σ = spec limits → 0.27% defective (2700 PPM)", color:"#ef4444" },
          { title:"Cpk = 1.33", note:"±4σ = spec limits → 0.0063% defective (63 PPM)", color:"#f59e0b" },
          { title:"Cpk = 1.67", note:"±5σ = spec limits → 0.00006% defective (0.6 PPM)", color:"#10b981" },
          { title:"Cpk = 2.00 (6σ)", note:"±6σ = spec limits → 3.4 PPM (with 1.5σ shift)", color:"#3b82f6" },
        ].map((c,i)=>(
          <div key={i} style={{padding:"10px 12px",background:DARK,borderRadius:8,border:`1px solid ${c.color}30`}}>
            <div style={{fontWeight:700,color:c.color,fontSize:13,marginBottom:3}}>{c.title}</div>
            <div style={{fontSize:12,color:"#94a3b8"}}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 12 — SPC Control Chart (Interactive)
// ─────────────────────────────────────────────
export function Module12_SPC() {
  const gen = useCallback(()=>{
    const mean=1.2500, s=0.0008;
    return Array.from({length:25},(_,i)=>{
      const u1=Math.random(),u2=Math.random();
      const z=Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
      let v=mean+s*z;
      if(i===7) v=mean+3.4*s;
      if(i===14) v=mean-3.2*s;
      if(i>=16&&i<=22) v=mean+(i-15)*0.00015;
      return { n:i+1, v:parseFloat(v.toFixed(5)), UCL:parseFloat((mean+3*s).toFixed(5)), LCL:parseFloat((mean-3*s).toFixed(5)), CL:parseFloat(mean.toFixed(5)), ooc:v>mean+3*s||v<mean-3*s };
    });
  },[]);
  const [data,setData]=useState(gen);
  const [sel,setSel]=useState(null);
  const CustomDot=({cx,cy,payload})=>{
    if(payload.ooc) return <circle cx={cx} cy={cy} r={7} fill="#ef4444" stroke="#fff" strokeWidth={2}/>;
    return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="#fff" strokeWidth={1.5}/>;
  };
  const ooc=data.filter(d=>d.ooc).length;
  const cpk=parseFloat((Math.min((data[0].UCL-data[0].CL),(data[0].CL-data[0].LCL))/(3*0.0008)).toFixed(2));
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#3b82f6")}>MODULE 12</span>
      <h1 style={{...S.h1,marginTop:8}}>Statistical Process Control — I-Chart</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Shaft OD — Nominal: 1.2500" ±0.0025"</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
      {[["CL",data[0].CL.toFixed(4)+'"',"#34d399"],["UCL",data[0].UCL.toFixed(4)+'"',"#ef4444"],["LCL",data[0].LCL.toFixed(4)+'"',"#ef4444"],["Cpk",cpk,cpk>=1.33?"#34d399":"#ef4444"]].map(([l,v,c])=>(
        <div key={l} style={{...S.card,marginBottom:0,textAlign:"center"}}>
          <div style={{fontSize:10,color:"#64748b",letterSpacing:1}}>{l}</div>
          <div style={{fontSize:18,fontWeight:700,color:c,marginTop:4}}>{v}</div>
        </div>
      ))}
    </div>
    <div style={S.card}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,color:"#94a3b8",fontWeight:600}}>25 SAMPLES — {ooc} OUT OF CONTROL</span>
        <button onClick={()=>{setData(gen());setSel(null);}} style={{background:"#334155",border:"1px solid #475569",borderRadius:6,padding:"5px 12px",color:"#94a3b8",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>↻ New Data</button>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} onClick={e=>e?.activePayload&&setSel(e.activePayload[0]?.payload)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f"/>
          <XAxis dataKey="n" stroke="#475569" tick={{fill:"#64748b",fontSize:11}}/>
          <YAxis stroke="#475569" tick={{fill:"#64748b",fontSize:10}} tickFormatter={v=>v.toFixed(4)} width={65}/>
          <Tooltip formatter={v=>[v.toFixed(5)+'"',"Value"]} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#f1f5f9"}}/>
          <ReferenceLine y={data[0].UCL} stroke="#ef4444" strokeWidth={2} label={{value:"UCL",position:"right",fill:"#ef4444",fontSize:11}}/>
          <ReferenceLine y={data[0].LCL} stroke="#ef4444" strokeWidth={2} label={{value:"LCL",position:"right",fill:"#ef4444",fontSize:11}}/>
          <ReferenceLine y={data[0].CL} stroke="#34d399" strokeDasharray="6 3" strokeWidth={2} label={{value:"CL",position:"right",fill:"#34d399",fontSize:11}}/>
          <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={<CustomDot/>}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
    {sel&&(
      <div style={{...S.card,border:`1px solid ${sel.ooc?"#ef4444":"#334155"}`}}>
        <div style={{fontSize:13,color:"#f1f5f9"}}><strong>Sample {sel.n}:</strong> {sel.v.toFixed(5)}" — <span style={{color:sel.ooc?"#ef4444":"#34d399",fontWeight:700}}>{sel.ooc?"⚠ OUT OF CONTROL — Stop and investigate!":"✓ In statistical control"}</span></div>
      </div>
    )}
    <div style={S.card}>
      <div style={S.label}>Western Electric Rules</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
        {["1 point beyond 3σ","8 consecutive points same side of CL","6 points in a row trending up or down","2 of 3 consecutive points beyond 2σ","4 of 5 points beyond 1σ","15 points in a row within ±1σ (hugging)","8 points both sides of CL with none in Zone C","14 points alternating up and down"].map((r,i)=>(
          <div key={i} style={{display:"flex",gap:8,padding:"8px 10px",background:DARK,borderRadius:6}}>
            <span style={{color:"#ef4444",fontWeight:700,minWidth:16,fontSize:12}}>R{i+1}</span>
            <span style={{fontSize:12,color:"#94a3b8"}}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  </>);
}


// ─────────────────────────────────────────────
// MODULE 13 — Gauge R&R Results Interpreter
// ─────────────────────────────────────────────
export function Module13_GaugeRR() {
  const [grr, setGrr] = useState(18);
  const [ndc, setNdc] = useState(4);
  const status = grr<10?"Excellent":grr<30?"Acceptable — be ok depending on application":"Unacceptable — gauge system must be improved";
  const statusColor = grr<10?"#34d399":grr<30?"#f59e0b":"#ef4444";
  const ndcStatus = ndc>=5?"Adequate":ndc>=2?"Marginal":"Inadequate — cannot distinguish parts";
  const ndcColor = ndc>=5?"#34d399":ndc>=2?"#f59e0b":"#ef4444";
  return wrap(<>
    <div style={{marginBottom:20}}>
      <span style={S.badge("#10b981")}>MODULE 13</span>
      <h1 style={{...S.h1,marginTop:8}}>Measurement System Analysis — Gauge R&R</h1>
      <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Adjust sliders to interpret %GRR and ndc results</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <div style={S.card}>
        <div style={S.label}>%GRR (% of Tolerance)</div>
        <div style={{fontSize:48,fontWeight:800,color:statusColor,margin:"8px 0"}}>{grr}%</div>
        <input type="range" min={1} max={50} value={grr} onChange={e=>setGrr(+e.target.value)} style={��Y��L	H�X��[���܎��]\���܋\��[����N�L_Kς�]��[O^��Y[�Έ�L���X��ܛ�[��T���ܙ\��Y]\Ύ�۝�^�N�L���܎��]\���܋�۝�ZY���_O���]\�O�]���]��[O^��X\��[���L\�^N���^��^\�X�[ێ����[[���\�_O����ȏL	H�����NH��^�[[�8�%\�H�]Y�H�KȌLL�	H��ٍNYL���X��\X�H8�%]�[X]H�Kȸ�iL�	H���Y�


��[�X��\X�H8�%�^�]Y�H�WK�X\

܋�JOO��]��^O^ܟH�[O^��\�^N���^��\�[Yے][\Έ��[�\���۝�^�N�L__O��]��[O^���Y�ZY���ܙ\��Y]\Ό��X��ܛ�[����^��[�Ό_Kς��[��[O^����܎���۝�ZY���Z[��Y�
_O�ܟO��[����[��[O^����܎��͍
���_O��O��[����]���
J_B��]����]���]��[O^�˘�\�O��]��[O^�˛X�[O���
�[X�\�و\�[���]Y�ܚY\�O�]���]��[O^�ٛ۝�^�N��۝�ZY����܎�����܋X\��[����_O�ۙ�O�]���[�]\OH��[��H�Z[�^�_HX^^�LH�[YO^ۙ�Hې�[��O^�OO��]��
�K�\��]��[YJ_H�[O^���Y��L	H�X��[���܎�����܋X\��[����N�L_Kς�]��[O^��Y[�Έ�L���X��ܛ�[��T���ܙ\��Y]\Ύ�۝�^�N�L���܎�����܋�۝�ZY���_O�ۙ��]\�O�]���]��[O^��X\��[���L\�^N���^��^\�X�[ێ����[[���\�_O����ȸ�iMH�����NH���[�\�[��Z\�
J��]Y�ܚY\ȗKȌ�M��ٍNYL���[Z]Y8�%X\��[�[\�H�KȌH���Y�


���[���\�[��Z\�\�ȗWK�X\

܋�JOO��]��^O^ܟH�[O^��\�^N���^��\�[Yے][\Έ��[�\���۝�^�N�L__O��]��[O^���Y�ZY���ܙ\��Y]\Ό��X��ܛ�[����^��[�Ό_Kς��[��[O^����܎���۝�ZY���Z[��Y��_O�ܟO��[����[��[O^����܎��͍
���_O��O��[����]���
J_B��]����]����]���]��[O^�˘�\�O��]��[O^�˛X�[O���\��\�وYX\�\�[Y[��\�X][ۏ�]���]��[O^��\�^N��ܚY�ܚY[\]P��[[�Έ��\X]
�Y��H��\�_O����ܘΈ��\X]X�[]H
U�H�\�Έ��[YH�\�]܋�[YH�]Y�K�[YH\�8�%�\�X][ۈ���H�]Y�H]�[����܎���؎����K��ܘΈ��\��X�X�[]H
U�H�\�Έ�Y��\�[��\�]ܜ�\�[���[YH�]Y�H8�%�\�X][ۈ���H�\�]ܜȋ��܎����Xٍ��K��ܘΈ�\�]�T\�
�H�\�Έ�X�X[\��\�X][ۈ8�%�]�H�S�H�]Y�H�YX\�\�H���܎���L�NH�K�K�X\

�JOO��]��^O^�_H�[O^�ؘX��ܛ�[��T���ܙ\��Y]\ΎY[�Έ�L�M��ܙ\��\��Y	�˘��ܟL�_O��]��[O^�ٛ۝�^�N�L��۝�ZY�����܎�˘��܋X\��[����N��_O��˜ܘ�O�]���]��[O^�ٛ۝�^�N�LK��܎���ML؎�[�RZY��K�__O��˙\��O�]����]���
J_B��]����]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SHM8�%�\��ۙHXYܘ[H
�[\Y�YY[X�Y
B���8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[LMњ\��ۙJ
H�ۜ���[�]�[HH\�T�]J�[
N�ۜ��]�H��[YN��X[����܎���؎����X�ێ��'�mȋ�]\�\Ζȕ[��Z[�Y[��X�܈���\�]܈�]Y�YH��ܛۙ�YX\�\�[Y[�X��\]YH����������Y�HK���[YN��XX�[�H���܎����Xٍ��X�ێ����{�#ȋ�]\�\Ζȕ���X\����[�H�[��]���^\�H�ܛ����SH�ؙH\��܈�HK���[YN��X]\�X[���܎���L�NH�X�ێ��'�鈋�]\�\Ζȕܛۙ�[�H�X�Z]�Y��X]�X]�]و�Xȋ��\��X�H�۝[Z[�][ۈ��[Y[��[ۘ[�\�X][ۈ[����ȗHK���[YN��Y]����܎��ٍNYL��X�ێ��'��ȋ�]\�\Ζȓ���۝��[���ܛۙ�[��X�[ۈ�\]Y[��H������[\[Y[�Y�����\��YX�H[��X�[ۈ�HK���[YN��YX\�\�[Y[����܎���Y�


�X�ێ��'��ȋ�]\�\Ζȑ�]Y�H�]و�[X��][ۈ���܈�]Y�H�����ܛۙ��]Y�H�[X�Y��[��\�ۛY[�[\��܈�HK���[YN��[��\�ۛY[����܎���
���
�X�ێ��'��H��]\�\Ζȕ[\\�]\�H�\�X][ۈ�����[��۝[Z[�][ۈ���X��][ۈ���H�X\��HXX�[�\ȋ��\�Z[\[��^\�H�HK�N�]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J��Y�


�_O�S�SHM��[���H�[O^�ˋ��˚KX\��[���_O��\��ۙH
\�Z�]�JHXYܘ[H8�%
�HY]��O���[O^����܎��͍
����۝�^�N�L�X\��[����_O�Y��X��[Y[��[ۘ[�ۋP�ۙ�ܛX[��HۈXX�[�Y\�����]���]��[O^�ˋ��˘�\�X\��[����N�M�^[Yێ���[�\���X��ܛ�[���̌LH��ܙ\���\��Y�Y�



L�_O��]��[O^�ٛ۝�^�N�M�۝�ZY�����܎��٘�MXMH�_O����ГSH�Q��P��]���]��[O^�ٛ۝�^�N�N�۝�ZY����܎���Y�


�X\��[���_O�[Y[��[ۘ[�ۋP�ۙ�ܛX[��HۈXX�[�Y\��]����]���]��[O^��\�^N��ܚY�ܚY[\]P��[[�Έ��\X]
�Y��H��\�LX\��[����N�M�_O����]˛X\

�JOO��]��^O^�_Hې�X��^�
OO��]�[
�[OOZO۝[�J_B��[O^�ˋ��˘�\�X\��[����N��\��܎���[�\���ܙ\��\��Y	��[OOZO�˘��܎�����MMH�X�X��ܛ�[���[OOZO�˘��܊ȌMH����YL�L؈��[��][ێ��[��ȟ_O��]��[O^��\�^N���^�[Yے][\Έ��[�\���\�X\��[����N�_O���[��[O^�ٛ۝�^�N��_O��˚X�۟O��[����[��[O^�ٛ۝�ZY�����܎�˘��܋�۝�^�N�M_O��˛�[Y_O��[����]�����[OOZH	��
�]��[O^��\�^N���^��^\�X�[ێ����[[���\�_O���˘�]\�\˛X\

�]\�K�OO��]��^O^ڟH�[O^��\�^N���^��\��[Yے][\Έ��[�\��_O��]��[O^���Y�KZY��K�ܙ\��Y]\Έ�L	H��X��ܛ�[��˘��܋�^��[�Ό_Kς��[��[O^�ٛ۝�^�N�L���܎���ML؎�_O���]\�_O��[����]���
J_B��]���
_B���[OOZH	���]��[O^�ٛ۝�^�N�LK��܎���
�MM�H�_O��˘�]\�\˛[��H�[�X[�]\�\�8�%�X���^[��]��B��]���
J_B��]���]��[O^�˘�\�O��]��[O^�˛X�[O�H�\�[�Yܘ][ۏ�]���]��[O^��\�^N���^��^\�X�[ێ����[[���\��_O���ȕ�HYH�ۋX�ۙ�ܛX[��H���\��8������X\�^�YYYٙ��][Z]���HY���X\�^�YY[Z]�8�������Y�H�X��[���\�[H���H�\�\�H����Y�H�X��[���8�������[\[Y[�Yۈ\��\�][ۈ���H�\�����[\[Y[�Y�8������۝��[�^\�Y�܈\��X]\�H���H�\�\�H���۝��[��8���TT���\���\���\Y]][��8�������UT�H�K�X\

�JOO��]��^O^�_H�[O^��\�^N���^��\�L[Yے][\Έ��^\�\��Y[�Έ�L��X��ܛ�[��T���ܙ\��Y]\΍��ܙ\��OOOMȌ\��Y���NM���\��Y�[��\�[��_O���[��[O^����܎�OOOMȈ���NH����؎�����۝�ZY����۝�^�N�L�Z[��Y�M�_O��J�_O��[����[��[O^�ٛ۝�^�N�L���܎�OOOMȈ���NH����ML؎�_O���O��[����]���
J_B��]����]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SHM�8�%T�LL��RT����\������8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[LM�ѐRT�
H�ۜ���\�]�\HH\�T�]J
N�ۜ��\�H��[N�K]N��]\�Z[�H�RT��\]Z\�[Y[����܎���؎�����[��ȓ�]�\��[X�\����\����X�[ۈY�\�\�Yۈ�[��H����X�[ۈ\�H
\X�[H�YX\��H���[��H[�X[�Y�X�\�[����][ۈ���[��H[��X�X[���\���\Y\��KX�[ێ���]�Y]��\��Y\��۝�X�[�\��\�Hܙ\��܈�RT��\]Z\�[Y[�ˈ�ۙ�\�H���H�]�\��Y\�Y�[��\�Z[���K���[N��]N���ܛHH8�%\�Yۈ��[Y[�][ۈ���܎����Xٍ���[��Ȑ��\[H[�]�[���]�\�[ۜȋ��\\�H[�]�[����\ȋ�Y[�Y�H[�Y�\�[��Y�X�ȋ���[Y[�[��[�Y\�[���[��\ȋ��\�Y�H�]�\�[ۈ]�[�X]�ȗKX�[ێ��]�\�H�]�[����K�\�[��K[��X�Y�X�][ۈ�Y�\�[��H]\��H��[Y[�Y�Z\��[��][\�H[���\]H�RT���K���[N��]N���ܛH�8�%X]\�X[	����\�ȋ��܎���L�NH��[��Ȑ��X�X]\�X[�\�Y�X�][ۜ�
U��H��؝Z[��X�X[���\���\�ȋ��\�Y�H�Q�T\�ݘ[��\��[�����[Y[�[�X�]Y\��\Y\�ȋ��ۙ�\�H�\��]�\�[ۈ]�[ȗKX�[ێ��X]\�X[�\��]\��X�H�H�X�Y�X��\�Y��X�X[���\���\��]\��H�\��[�[����H\�ݙY�\Y\���K���[N�]N���ܛH�8�%�\�X�\�\�X�X���[�X�[]H���܎��ٍNYL���[��ȓ\�U�T�H�]�[���\�X�\�\�Xȋ�YX\�\�H[[Y[��[ۜȋ���[Y[�X�X[�[Y\�
���\�\��٘Z[
H���Y�[�H�ۋX�ۙ�ܛX[��\ȋ���\]H[�	��[�]��XH�SH�KX�[ێ��]�\�H�[��H�\�X�\�\�X�8�%[Y[��[ۜ���\��\�[��\��	�8�%\��\X\�ۈ�ܛH��]X�X[YX\�\�Y�[Y\ˈ�K���[N�K]N���RT��]�Y]�	�\���][ۈ���܎���Y�


��[��Ȕ�]�Y]��܈��\][�\�ȋ��\�Y�H[X�X[��][��\�[��H��\���][ۈ[�H�ۋX�ۙ�ܛX[��\ȋ��][��[�Y\�[���Yۋ[ٙ����\\�H�X�Z\��[ۈX��Y�H�KX�[ێ���ۋX�ۙ�ܛX[��\�ۈ�RT����]]�X]X�[H�Z�X�H\�8�%^H�\]Z\�H\���][ۈ
PRK�]�ܚ��ܘ\�ۘ�\��[ۊK��K���[N��]N���\��Y\��X�Z\��[ۈ���܎���
���
��[��ȔX��Y�H[�YH�ܛ\ȋ�[��YH�\ܝ[����[Y[�][ۈ���X�Z]\��\��Y\�ܝ[܈���Y\�H���\�ۙ��]�Y]���[Y[�ȋ�XZ[�Z[��RT�ۈ�[H\��][�[ۈ�\]Z\�[Y[�ȗKX�[ێ���RT�]\��H�]Z[�Y�܈Y�Hو\���۝�X���\��Y\�\�ݘ[و�RT�\��\]Z\�Y�Y�ܙH��X�[ۈ�\Y[�ˈ�K�N�]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J�ٍNYL��_O�S�SHM���[���H�[O^�ˋ��˚KX\��[���_O�T�LL��\��\�X�H[��X�[ۈ�\ܝ
�RT�O�O���[O^����܎��͍
����۝�^�N�L�X\��[����_O��\��Y�H��\]H�RT����\������]���]��[O^��\�^N���^��\��X\��[����N�M��^ܘ\��ܘ\�_O����\˛X\

�JOO���]ۈ�^O^�_Hې�X��^�
OO��]�\
J_B��[O^�ؘX��ܛ�[���\OOZO�˘��܊Ȍ�H����YL�L؈��ܙ\��\��Y	��\OOZO�˘��܎�����MMH�X�ܙ\��Y]\ΎY[�Έ�M���܎��\OOZO�˘��܎��͍
����۝�^�N�L��۝�ZY����\��܎���[�\���۝�[Z[N��[�\�]�_O���\�˛�[_B�؝]ۏ��
J_B��]���]��[O^�ˋ��˘�\��ܙ\��\��Y	��\���\K���ܟML_O��]��[O^��\�^N���^��\�L�[Yے][\Έ��^\�\��X\��[����N�M_O��]��[O^���Y�
ZY��
�ܙ\��Y]\ΌL�X��ܛ�[���\���\K���܊Ȍ���ܙ\��\��Y	��\���\K���ܟM\�^N���^�[Yے][\Έ��[�\���\�Y�P�۝[����[�\���۝�^�N���۝�ZY����܎��\���\K���܋�^��[�Ό_O���\���\K��[_O�]���]���]��[O^�ٛ۝�^�N�LK��܎��\���\K���܋�۝�ZY���]\��X�[�ΌKX\��[����N�_O��T��\���\K��[_Hш
��]�����[O^��X\��[����܎��َ�Y�ȋ�۝�^�N�M�_O���\���\K�]_O�ς��]����]���]��[O^�˛X�[O��\]Z\�[Y[����X��\��]���]��[O^��\�^N���^��^\�X�[ێ����[[���\�X\��[����N�L�_O����\���\K��[��X\

�JOO��]��^O^�_H�[O^��\�^N���^��\�Y[�Έ��L��X��ܛ�[��T���ܙ\��Y]\΍�_O���[��[O^����܎��\���\K���܋�۝�^�N�L�_O��$��[����[��[O^�ٛ۝�^�N�L���܎���ML؎�_O���O��[����]���
J_B��]���]��[O^��Y[�Έ�LM��X��ܛ�[��T���ܙ\��Y]\Ύ�ܙ\��\��Y	��\���\K���ܟL��۝�^�N�L���܎��ٌY�Y�H�[�RZY��K��_O��<'�H��ۙϒ�^H�[�����ۙϞ��\���\K�X�[۟B��]����]���]��[O^��\�^N���^��\�Y�P�۝[����X�KX�]�Y[���\�_O���]ۈې�X��^�
OO��]�\
X]�X^
�\LJJ_H\�X�Y^��\OOLH�[O^�ٛ^�K�X��ܛ�[����YL�L؈��ܙ\���\��Y���MMH��ܙ\��Y]\ΎY[�Έ�L���܎��\OOLȈ���MMH����ML؎��\��܎��\OOLșY�][����[�\���۝�[Z[N��[�\�]�_O����]�[�\�؝]ۏ���]ۈې�X��^�
OO��]�\
X]�Z[��\˛[��LK�\
�JJ_H\�X�Y^��\OO\�\˛[��L_H�[O^�ٛ^�K�X��ܛ�[����YL�L؈��ܙ\���\��Y���MMH��ܙ\��Y]\ΎY[�Έ�L���܎��\OO\�\˛[��LOȈ���MMH����ML؎��\��܎��\OO\�\˛[��LOșY�][����[�\���۝�[Z[N��[�\�]�_O��^8���؝]ۏ���]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SH�8�%�\Y\���ܙX�\��[][]܂���8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[L���\Y\���ܙX�\�

H�ۜ����ܙ\��]��ܙ\�HH\�T�]J�]X[]N�
K[]�\�N�L��\�ۜ�]�[�\�΍��\�ΌL��\���JN�ۜ��ZY��H�]X[]N���K[]�\�N���K�\�ۜ�]�[�\�Ό�MK�\�Ό�MK��\���LN�ۜ��[Hؚ�X���^\���ܙ\�K��YX�J
X���OO�X�����ܙ\���J��ZY����K
K�њ^Y
JN�ۜ��]\�H�[�NLȔ�Y�\��Y���[�M�OȐ\�ݙY���[�M�Ȑ�ۙ][ۘ[���\�]X[Y�YY��ۜ��]\���܈H�[�NLȈ���NH���[�M�OȈ�؎������[�M�ȈٍNYL�����Y�


��ۜ�X�[�H�]X[]N��]X[]H
K�Y�X��H�[]�\�N��ۋU[YH[]�\�H��\�ۜ�]�[�\�Έ���T��\�ۜ�H[YH��\�Έ��\�Y�X�][ۈ�\��[��H���\�����T����\�H�]H�N�]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J��L�NH�_O�S�SH���[���H�[O^�ˋ��˚KX\��[���_O��\Y\���ܙX�\��[][]܏�O���[O^����܎��͍
����۝�^�N�L�X\��[����_O�Y�\���ܙ\���YH�\Y\��][���[�[][ۏ����]���]��[O^�ˋ��˘�\�^[Yێ���[�\���ܙ\��\��Y	��]\���ܟMLX\��[����N�M�_O��]��[O^�ٛ۝�^�N�M��܎��͍
���X\��[����N�_O�ݙ\�[�\Y\��][���]���]��[O^�ٛ۝�^�N�M��۝�ZY����܎��]\���܋[�RZY��__O���[O�]���]��[O^�ٛ۝�^�N���۝�ZY�����܎��]\���܋X\��[���_O���]\�O�]����]���]��[O^�˘�\�O���ؚ�X���^\���ܙ\�K�X\
�O��]��^O^��H�[O^��X\��[����N�M�_O��]��[O^��\�^N���^��\�Y�P�۝[����X�KX�]�Y[��X\��[����N��_O��]����[��[O^�ٛ۝�^�N�L��۝�ZY�����܎��ٌY�Y�H�_O��X�[���_O��[����[��[O^�ٛ۝�^�N�LK��܎���
�MM�H�X\��[�Y��_O��ZY����ZY����J�L
K�њ^Y

_IO��[����]����[��[O^�ٛ۝�ZY�����܎���ܙ\���O�NȈ���NH����ܙ\���O�M�ȈٍNYL�����Y�


�_O����ܙ\���_O��[����]���[�]\OH��[��H�Z[�^�HX^^�LH�[YO^���ܙ\���_Hې�[��O^�OO��]��ܙ\�ˋ����ܙ\���N��K�\��]��[Y_J_B��[O^���Y��L	H�X��[���܎���ܙ\���O�NȈ���NH����ܙ\���O�M�ȈٍNYL�����Y�


�_Kς�]��[O^��ZY���X��ܛ�[�����M̘H��ܙ\��Y]\Ό�X\��[���_O��]��[O^���Y�	���ܙ\���_IXZY���L	H��X��ܛ�[����ܙ\���O�NȈ���NH����ܙ\���O�M�ȈٍNYL�����Y�


��ܙ\��Y]\Ό��[��][ێ���Y��ȟ_Kς��]����]���
J_B��]���]��[O^��\�^N��ܚY�ܚY[\]P��[[�Έ��\X]

Y��H��\�_O����ȸ�iNL�����NH���Y�\��Y���YX�Y[���Z[��[��X�[ۈ�Kȍ�KNH���؎�����\�ݙY���[�\�ݙ\��Y��Kȍ�M���ٍNYL����ۙ][ۘ[���ܜ�X�]�HX�[ۈ[��\]Z\�Y�Kȏ
����Y�


��\�]X[Y�YY���[[ݙH���HT��WK�X\

܋���JOO��]��^O^ܟH�[O^�ˋ��˘�\�X\��[����N��ܙ\��\��Y	��L�_O��]��[O^�ٛ۝�ZY�����܎���۝�^�N�L�X\��[����N��_O�ܟH8�%��O�]���]��[O^�ٛ۝�^�N�LK��܎��͍
���_O�۟O�]����]���
J_B��]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SH�H8�%�QPH���[�[]܂���8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[L�WѓQPJ
H�ۜ�ܛ����]����HH\�T�]J�[�N������XZ��ZYX�]�Y��X����ܘ\Y\�XX�[�H�۝[YH�΍�Ό��K��[�N��ܛۙ�ٙ��]��ܘ[[YY�Y��X����][ً]�\�[��H[Y[��[ۈ�ΎΌ���K��[�N�����[��Z[\�H�Y��X����\��X�H�[�\�Y�X�\�X[[XY�H�΍�΍�HK��[�N���^\�H�\�Y��X���[Y[��[ۘ[�Y����X�Hܘ\��ΎKΌ���K�JN�ۜ�\]HH
K��HO��]�������˛X\

��OO��OOZO�ˋ�����N�ݟN��JN�ۜ�����܈H
��HO����L�Ȉ�Y�


�����LLȈٍNYL������MLȈ�؎���������NH��]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J�َM��M��_O�S�SH�O��[���H�[O^�ˋ��˚KX\��[���_O����\���QPH8�%���[�[]܏�O���[O^����܎��͍
����۝�^�N�L�X\��[����_O�Y�\��]�\�]K���\��[��K]X�[ۈ��YH�\���[ܚ]H�[X�\������]���]��[O^��ݙ\������]]ȋX\��[����N�M�_O��X�H�[O^���Y��L	H��ܙ\���\�N����\�H��۝�^�N�L�_O��XY����[O^�ؘX��ܛ�[�����M̘H�_O���ȑ�Z[\�H[�H��Y��X����
KLL
H���
KLL
H��
KLL
H������X�[ۈ�K�X\
O���^O^�H�[O^��Y[�Έ�LL��^[Yێ��Y��[�܎��͍
����۝�ZY���]\��X�[�Ό�K�ܙ\����N��\��Y���MMH��۝�^�N�L__O��O���
J_B������XY����O��ܛ��˛X\

�JOO��ۜ���\��ʜ��ʜ���]\�����^O^�_H�[O^�؛ܙ\����N��\��Y�YL�L؈�_O���[O^��Y[�Έ�LL����܎��ٌY�Y�H��۝�ZY���_O�܋�[�_O����[O^��Y[�Έ�LL����܎���ML؎�_O�܋�Y��X�O����Ȕȋ�ȋ��K�X\
�O���^O^��H�[O^��Y[�Έ�L��_O��[�]\OH��[��H�Z[�^�_HX^^�LH�[YO^ܖ��_Hې�[��O^�OO�\]JK�K�\��]��[YJ_H�[O^���Y��X��[���܎��OOH�ȏȈ�Y�


���OOH�ȏȈٍNYL�����؎����_Kς��[��[O^��X\��[�Y�����܎��OOH�ȏȈ�Y�


���OOH�ȏȈٍNYL�����؎�����۝�ZY���_O�ܖ��_O��[������
J_B��[O^��Y[�Έ�LL��_O���[��[O^�ٛ۝�^�N�N�۝�ZY����܎�����܊��__O�ܜ�O��[�������[O^��Y[�Έ�LL����܎��͍
����۝�^�N�L__O��ܜ��L�Ȓ[[YYX]HX�[ۈ�����LLȐX�[ۈ�\]Z\�Y�����MLȓ[ۚ]܈�����LOȐX��\X�H����B��������
NJ_B����O���X�O���]���]��[O^��\�^N��ܚY�ܚY[\]P��[[�Έ��\X]
�Y��H��\�L_O����Ȕ�]�\�]H
�H���Y�


��LR^�\��\�RY�
�S[�\�]K�SZ[�܋OS�ۙH�Kȓ���\��[��H
�H��ٍNYL���LP[[���\�Z[�
�RY�
S[�\�]K�S��OT�[[�H�Kȑ]X�[ۈ

H���؎�����LP�[���]X�
�S���[��K
S[�\�]H�[��KOP[[���\�Z[�]X�[ۈ�WK�X\

��JOO��]��^O^�H�[O^�ˋ��˘�\�X\��[����N��ܙ\��\��Y	��L�_O��]��[O^�ٛ۝�ZY�����܎���۝�^�N�L�X\��[����N��_O��O�]���]��[O^�ٛ۝�^�N�LK��܎��͍
���[�RZY��K�__O��O�]����]���
J_B��]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SH�8�%���و]X[]H\���\����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[L����J
H�ۜ�������]����HH\�T�]J��]�[�[ێ�ML\�Z\�[���[�\��[�
L^\��[��JN�ۜ��[Hؚ�X���[Y\�����K��YX�J
K�OO�J؋
N�ۜ���HH���˚[�\��[
����˙^\��[�ۜ�X�[�H��]�[�[ێ���]�[�[ۈ�\�Z\�[��\�Z\�[�[�\��[��[�\��[�Z[\�H�^\��[��^\��[�Z[\�H�N�ۜ���ܜ�H��]�[�[ێ�����NH�\�Z\�[���؎����[�\��[��ٍNYL��^\��[���Y�


�N�ۜ�]HHؚ�X���^\�����K�X\
�O���[YN�X�[���K�[YN�������K��
������K��[
J�L
K�њ^Y
JHJJN�]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J����NH�_O�S�SH���[���H�[O^�ˋ��˚KX\��[���_O����و]X[]H\���\��O���[O^����܎��͍
����۝�^�N�L�X\��[����_O�Y�\�������YH��H��XZ��ۈ[���H[\X�����]���]��[O^��\�^N��ܚY�ܚY[\]P��[[�Έ�Y��Y����\�LX\��[����N�M�_O��]��[O^�ˋ��˘�\�^[Yێ���[�\���ܙ\���\��Y���MMH�_O��]��[O^�ٛ۝�^�N�LK��܎��͍
���]\��X�[�Ό__O��S���шUPSUO�]���]��[O^�ٛ۝�^�N��۝�ZY����܎��ٌY�Y�H�X\��[����_O���[�L
K�њ^Y

_R��]���]��[O^�ٛ۝�^�N�L���܎��͍
���_O��
�[�L
J�L
K�њ^Y
J_IHو�]�[�YH
\��O�]����]���]��[O^�ˋ��˘�\�^[Yێ���[�\���ܙ\���\��Y�Y�



L�_O��]��[O^�ٛ۝�^�N�LK��܎��͍
���]\��X�[�Ό__O����ш�ԈUPSUH
��JO�]���]��[O^�ٛ۝�^�N��۝�ZY����܎���Y�


�X\��[����_O����K�L
K�њ^Y

_R��]���]��[O^�ٛ۝�^�N�L���܎���Y�


�_O��
��K��[
J�L
K�њ^Y

_IHو�[��O�]����]����]���]��[O^�˘�\�O���ؚ�X���^\�����K�X\
�O��]��^O^��H�[O^��X\��[����N�M_O��]��[O^��\�^N���^��\�Y�P�۝[����X�KX�]�Y[��X\��[����N��_O���[��[O^�ٛ۝�^�N�L��۝�ZY�����܎���ܜ���__O��X�[���_O��[����[��[O^�ٛ۝�ZY�����܎��ٌY�Y�H�_O��������K����[T��[��
_O��[����]���[�]\OH��[��H�Z[�^�HX^^�LH�\^�LH�[YO^�������_Hې�[��O^�OO��]����ˋ��������N��K�\��]��[Y_J_B��[O^���Y��L	H�X��[���܎���ܜ���__Kς�]��[O^��ZY����X��ܛ�[�����M̘H��ܙ\��Y]\Ό�X\��[���_O��]��[O^���Y�	�������K�L
J�LIXZY���L	H��X��ܛ�[����ܜ���K�ܙ\��Y]\Ό��[��][ێ���Y��ȟ_Kς��]����]���
J_B��]���]��[O^�ˋ��˘�\��ܙ\���\��Y���MMH�_O��]��[O^�˛X�[O�H�]�[�[ۈ[��\�Y[��[��\O�]���]��[O^�ٛ۝�^�N�L���܎���ML؎�[�RZY��K��_O����ۙ��[O^����܎�����NH�_O�]�\�H	H�[�ۈ�]�[�[ۏ���ۙψ�]�\�	L[�[�\��[�Z[\�H����[�	L
�[�^\��[�Z[\�H����
�\��Y\��]\����\��[�K�\]][ۈ[XY�JK���ܛX�\��X[�Y�X�\�\��\��]��ۙ��[O^����܎��ٌY�Y�H�_O���H�[��
IHو�]�[�YO���ۙψ�]�]�[�[ۈ�\�\�[�[��H\��\��[��H�]Y�ܞK����Hݙ\��	Hو�[��H�Yۘ[�H]X[]H�\�[H]\��XX�]�K����X�]�K���]����]���ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���S�SH��8�%]X[]H�[\�H\��\��Y[����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�[��[ۈ[�[L���]X[]P�[\�J
H�ۜ����ܙ\��]��ܙ\�HH\�T�]J�JN�ۜ�[\�H��^N��XY\��\�X�[��XY\��\��[Z]Y[��N���\��X[�Y�[Y[��\�X�H�[\[ۈ]X[]H8�%���\���X�[ۈ�]]ȈK���^N��X���[�X�[]H�X�[��X���[�X�[]H�N���[�]�YX[��ۈ]X[]H�]��Y\��܈Z\�\�XK܈\�]X[]H	�HSI���؉�ȈK���^N����[][�X�][ۈ�X�[��]X[]H��[][�X�][ۈ�N��\�]X[]H]H�\�X�K\��\��Y[�X�Yۈ][]�[�ȈK���^N���]�[�[ۈ�X�[���]�[�[ۈZ[��]�N���\�HX[H��X�]�[H�]�[��؛[\�܈�[X\�[H�XX��[OȈK���^N��X\��[�ȋX�[��X\��[�����H�Z[\�H�N��\�H�Z[\�\�[�[^�Y[�X\��Y���K܈�\��^Y[��ܙ��[�ȈK���^N���YH�X�[���YH[��ܚ�X[��\�N����\�]ܜ�Z�H\��ۘ[�YH[���X�[��]X[]H\��ȈK�N�ۜ�]��H[\˛[���	��ؚ�X���^\���ܙ\�K�[����
ؚ�X���[Y\���ܙ\�K��YX�J
K�OO�J؋
K�ؚ�X���^\���ܙ\�K�[��
K�њ^Y
JH���%��ۜ�X]\�]HH\��ܙ\�ؚ�X���^\���ܙ\�K�[��[\˛[��Ȓ[���\]H��]�ϏMȕ�ܛ�\�Ȏ�]�ϏL�Ȕ��ܙ\��[�Ȏ�]�ϏL�ȑ]�[�[�Ȏ���XX�]�H��ۜ�X]\�]P��܈HX]\�]OOOH��ܛ�\�ȏȈ���NH��X]\�]OOOH���ܙ\��[�ȏȈ�؎�����X]\�]OOOH�]�[�[�ȏȈٍNYL�����Y�


��]\��ܘ\
��]��[O^��X\��[����N��_O���[��[O^�˘�Y�J���Xٍ��_O�S�SH����[���H�[O^�ˋ��˚KX\��[���_O�]X[]H�[\�H�[�P\��\��Y[��O���[O^����܎��͍
����۝�^�N�L�X\��[����_O��]H[�\�ܙ�[�^�][ۈۈXX�[Y[��[ۈ
OT�܋
OQ^�[[�
O����]���]��[O^�˘�\�O���[\˛X\

JOO��]��^O^�_H�[O^��X\��[����N�NY[�Л��N�N�ܙ\����N�O[\˛[��LOȌ\��Y�YL�L؈����ۙH�_O��]��[O^�ٛ۝�ZY�����܎��ٌY�Y�H��۝�^�N�L�X\��[����N�_O���X�[O�]���]��[O^�ٛ۝�^�N�L���܎��͍
���X\��[����N�[�RZY��K�__O���_O�]���]��[O^��\�^N���^��\��_O����K��

WK�X\
�O���]ۈ�^O^ݟHې�X��^�
OO��]��ܙ\�ˋ����ܙ\����^WN��J_B��[O^�ٛ^�KY[�Έ���X��ܛ�[����ܙ\����^WOOO]��Ȉ�Y�


��َM��M���ٍNYL����؎��������NH�V݋LWJȌ������M̘H��ܙ\��\��Y	���ܙ\����^WOOO]��Ȉ�Y�


��َM��M���ٍNYL����؎��������NH�V݋LWN�����MMH�X�ܙ\��Y]\΍���܎���ܙ\����^WOOO]��Ȉ�Y�


��َM��M���ٍNYL����؎��������NH�V݋LWN���
�MM�H��۝�ZY����۝�^�N�M�\��܎���[�\���۝�[Z[N��[�\�]��[��][ێ��[�M\ȟ_O��ݟB�؝]ۏ��
J_B��]������ܙ\����^WI��]��[O^�ٛ۝�^�N�LK��܎���
�MM�H�X\��[���_O��]Y��Ȉ���XX�]�H8�%�Z�\�XZ�܈�\���[��]�\�Y�H��]�[�[�ȋ�������ܛ�\�ȗV���ܙ\����^WW_O�]��B��]���
J_B��]����ؚ�X���^\���ܙ\�K�[��OOY[\˛[��	���]��[O^�ˋ��˘�\��ܙ\��\��Y	�X]\�]P��ܟML^[Yێ���[�\��_O��]��[O^�ٛ۝�^�N�LK��܎��͍
���X\��[����N�]\��X�[�Ό__O��ST�HPUT�UH��ԑO�]���]��[O^�ٛ۝�^�N�L��۝�ZY����܎�X]\�]P��ܟ_O��]��O�]���]��[O^�ٛ۝�^�N���۝�ZY�����܎�X]\�]P��܋X\��[����N�L�_O��X]\�]_O�]���]��[O^�ٛ۝�^�N�L���܎���ML؎�[�RZY��K��^[Yێ��Y��Y[�Έ��_O���X]\�]OOOH��ܛ�\�ȉ����]�[�[��8�%]X[]H\�[X�YY[�H�[\�K����\�ۈ�\�Z[�[��[��[��X\��[��Y�Z[��[�\��HXY\�ˈ�B��X]\�]OOOH���ܙ\��[�ȉ��������[�][ۋ�Y[�Y�HH�L���\�\��ܚ[��[Y[��[ۜ�[��Z[\��]Y[\�ݙ[Y[�[�ˈ�B��X]\�]OOOH�]�[�[�ȉ���]X[]H�[\�H\��Z[[���]�\��[XZ[��XY\��\�\�X�[]H[�X���[�X�[]H�\�[\��YY��[��[�[�ˈ�B��X]\�]OOOH��XX�]�H����]X[]H\��X]Y\�[��X�[ۋ[ۛK�XZ�܈�[\�H�[��H[�]X]]�H�\]Z\�Y�\�[���]XY\��\��[Z]Y[���B��]����]���
_B�ϊNB�����8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� ���PT�T�Vԕ8�%[�\�X[�[�^Y�H[�[B���8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� 8� �^ܝ�ۜ�S�S�SWՒT�PS�HN�[�[LW�]X[]U[Y[[�K���[�[L��ST�Y\�\��K�Έ[�[L��T��LP�]\�\��
�[�[L
�T�LL[K�
N�[�[L
W�Y�[��Q����ۋ�
Έ[�[L
�����[�[L�Y]����K�LN�[�[LLW��]\�X���L��[�[LL�����LΈ[�[LL���]Y�T���M�[�[LMњ\��ۙK�M��[�[LM�ѐRT����[�[L���\Y\���ܙX�\���N�[�[L�WѓQPK���[�[L����K����[�[L���]X[]P�[\�K�N���Y�][^ܝ8�%�\�X[�����\��܈\�[��[��\ۙ[�^ܝY�][�[��[ۈ[�\�X[�[[�
H�ۜ��X�]�K�]X�]�WHH\�T�]JJN�ۜ���\ۙ[�HS�S�SWՒT�PS��X�]�WN�ۜ�[�[\�Hؚ�X���^\�S�S�SWՒT�PS�K�X\
�[X�\�N�]\��
�]��[O^�ٛ۝�[Z[N���H�[���	��Y��HRI��[��\�\�Y���X��ܛ�[����L�YH�Z[�ZY���L��_O��]��[O^�ؘX��ܛ�[�����M̘H��ܙ\����N��\��Y�YL�L؈�Y[�Έ�L���\�^N���^��\��^ܘ\��ܘ\�[Yے][\Έ��[�\��_O���[��[O^�ٛ۝�^�N�L���܎���
�MM�H�X\��[��Y���۝�ZY���_O�S�SN���[����[�[\˛X\
OO���]ۈ�^O^�_Hې�X��^�
OO��]X�]�JJ_B��[O^�ؘX��ܛ�[��X�]�OOO[OȈ�Y
Y����YL�L؈��ܙ\��\��Y	�X�]�OOO[OȈ�؎���������MMH�X�ܙ\��Y]\΍�Y[�Έ�L���܎�X�]�OOO[OȈ�L��Y����͍
����۝�^�N�L��\��܎���[�\���۝�[Z[N��[�\�]��۝�ZY��X�]�OOO[O���_O���_B�؝]ۏ��
J_B��]������\ۙ[�	����\ۙ[�ϟB��]���
NB
