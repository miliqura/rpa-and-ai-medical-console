export interface DrugData {
  id: number;
  genericName: string;
  keywords: string;
  synonyms: string;
}

export const drugLiteratureData: DrugData[] = [
  {
    id: 1,
    genericName: "阿司匹林",
    keywords: "Aspirin, adverse effects, toxicity, ADR",
    synonyms: "Acetylsalicylic acid, ASA",
  },
  {
    id: 2,
    genericName: "布洛芬",
    keywords: "Ibuprofen, adverse effects, GI bleeding, toxicity",
    synonyms: "Isobutylphenylpropanoic acid, Advil, Motrin",
  },
  {
    id: 3,
    genericName: "二甲双胍",
    keywords: "Metformin, adverse effects, lactic acidosis",
    synonyms: "Dimethylbiguanide, Glucophage",
  },
  {
    id: 4,
    genericName: "华法林",
    keywords: "Warfarin, adverse effects, major bleeding",
    synonyms: "Coumadin, Jantoven",
  },
  {
    id: 5,
    genericName: "塞来昔布",
    keywords: "Celecoxib, adverse effects, cardiovascular events",
    synonyms: "Celebrex",
  },
  {
    id: 6,
    genericName: "奥美拉唑",
    keywords: "Omeprazole, adverse effects, bone fracture",
    synonyms: "Losec, Prilosec",
  },
  {
    id: 7,
    genericName: "孟鲁司特",
    keywords: "Montelukast, adverse effects, neuropsychiatric events",
    synonyms: "Singulair",
  },
  {
    id: 8,
    genericName: "对乙酰氨基酚",
    keywords: "Acetaminophen, adverse effects, hepatotoxicity",
    synonyms: "Paracetamol, Tylenol",
  },
];

export interface RobotAccount {
  id: string;
  name: string;
  status: "idle" | "running" | "offline";
}

export const robotAccounts: RobotAccount[] = [
  { id: "RPA001", name: "RPA001@yd", status: "idle" },
  { id: "RPA002", name: "RPA002@yd", status: "running" },
  { id: "RPA003", name: "RPA003@yd", status: "idle" },
  { id: "RPA004", name: "RPA004@yd", status: "offline" },
  { id: "RPA005", name: "RPA005@yd", status: "idle" },
];

export const getRobotAccount = (id: string): RobotAccount | undefined => {
  return robotAccounts.find((account) => account.id === id);
};

export interface Scene {
  id: string;
  name: string;
  description: string;
  hasButton: boolean;
  isRunning?: boolean;
  status?: "idle" | "running" | "completed" | "error";
  lastRun?: string;
  executorAccounts: string[];
  summary?: {
    successCount?: number;
    duplicateCount?: number;
    filteredCount?: number;
    successRate?: string;
    totalCount?: number;
    aiHitCount?: number;
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  scenes: Scene[];
}

export const departments: Department[] = [
  {
    id: "rd-quality",
    name: "研发与质量",
    description: "药品研发与质量管控流程",
    scenes: [
      {
        id: "literature-search",
        name: "文献检索与初筛",
        description: "检索文献数据库，自动筛选相关文献",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001", "RPA003"],
      },
      {
        id: "oos-monitor",
        name: "OOS/OOT异常监控",
        description: "实时监控化验数据，自动识别异常结果",
        hasButton: false,
        lastRun: "2024-01-15",
        executorAccounts: ["RPA002"],
      },
      {
        id: "reg-docs",
        name: "法规与研发资料关联",
        description: "关联法规要求与研发文档，确保合规",
        hasButton: false,
        lastRun: "2024-01-14",
        executorAccounts: ["RPA001", "RPA005"],
      },
    ],
  },
  {
    id: "reg-compliance",
    name: "注册与合规",
    description: "药品注册与合规管理",
    scenes: [
      {
        id: "reg-code-upload",
        name: "监管码采集上传",
        description: "采集药品监管码并上传至监管平台",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-15",
        executorAccounts: ["RPA002", "RPA003"],
      },
      {
        id: "drug-test-scrape",
        name: "药检网站信息抓取",
        description: "抓取药检网站公告和政策信息",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001"],
      },
      {
        id: "reg-status",
        name: "注册状态跟踪",
        description: "跟踪药品注册进度，提醒关键节点",
        hasButton: false,
        lastRun: "2024-01-13",
        executorAccounts: ["RPA004", "RPA005"],
      },
    ],
  },
  {
    id: "production",
    name: "生产制造",
    description: "生产订单与物料管理",
    scenes: [
      {
        id: "create-order",
        name: "创建生产订单",
        description: "根据销售预测生成生产订单",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001", "RPA002", "RPA003"],
      },
      {
        id: "inventory-check",
        name: "库存盘点",
        description: "自动化库存盘点，生成差异报告",
        hasButton: false,
        lastRun: "2024-01-12",
        executorAccounts: ["RPA003"],
      },
      {
        id: "material-master",
        name: "物料主数据维护",
        description: "同步物料信息，确保数据一致性",
        hasButton: false,
        lastRun: "2024-01-10",
        executorAccounts: ["RPA002", "RPA005"],
      },
    ],
  },
  {
    id: "supply-chain",
    name: "供应链与仓储",
    description: "药品供应链与仓储管理",
    scenes: [
      {
        id: "drug-trace",
        name: "药品追溯与流向协同",
        description: "全流程药品追溯，实时监控流向",
        hasButton: false,
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001", "RPA004"],
      },
      {
        id: "price-prediction",
        name: "价格趋势预测",
        description: "预测原材料价格趋势，推荐采购时机",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-14",
        executorAccounts: ["RPA002", "RPA003"],
      },
      {
        id: "logistics-alert",
        name: "物流异常预警",
        description: "监控物流状态，异常自动预警",
        hasButton: false,
        lastRun: "2024-01-15",
        executorAccounts: ["RPA005"],
      },
    ],
  },
  {
    id: "marketing",
    name: "市场营销",
    description: "销售数据与市场分析",
    scenes: [
      {
        id: "sales-summary",
        name: "销售数据自动汇总",
        description: "汇总各渠道销售数据，生成报表",
        hasButton: false,
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001", "RPA002"],
      },
      {
        id: "ad-monitor",
        name: "广告投放与监管",
        description: "监控广告合规性，检测违规内容",
        hasButton: false,
        lastRun: "2024-01-14",
        executorAccounts: ["RPA003", "RPA004"],
      },
      {
        id: "chain-data",
        name: "连锁客户数据采集",
        description: "采集连锁客户销售数据，分析市场表现",
        hasButton: true,
        status: "idle",
        lastRun: "2024-01-15",
        executorAccounts: ["RPA001", "RPA005"],
      },
    ],
  },
  {
    id: "finance",
    name: "财务",
    description: "财务管理与报表",
    scenes: [
      {
        id: "sap-reconciliation",
        name: "SAP财务对账",
        description: "完成SAP系统财务对账",
        hasButton: false,
        lastRun: "2024-01-15",
        executorAccounts: ["RPA002", "RPA003"],
      },
      {
        id: "invoice-recognition",
        name: "发票识别与录入",
        description: "识别发票信息，录入财务系统",
        hasButton: false,
        lastRun: "2024-01-14",
        executorAccounts: ["RPA001", "RPA004"],
      },
      {
        id: "monthly-report",
        name: "月结报表自动生成",
        description: "生成月结报表，支持多维度分析",
        hasButton: false,
        lastRun: "2024-01-10",
        executorAccounts: ["RPA003", "RPA005"],
      },
    ],
  },
];

export const searchFormulas: Record<string, string> = {
  阿司匹林:
    '("Aspirin"[MeSH] OR "Aspirin"[Title/Abstract] OR "Acetylsalicylic acid"[Title/Abstract] OR "ASA"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
  布洛芬:
    '("Ibuprofen/adverse effects"[Mesh] OR (("Ibuprofen"[Mesh] OR "ibuprofen"[Title/Abstract] OR "Isobutylphenylpropanoic acid"[Title/Abstract] OR "Advil"[Title/Abstract] OR "Motrin"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "adverse drug reaction"[Title/Abstract] OR "toxicity"[Title/Abstract] OR "side effect"[Title/Abstract] OR "drug-related side effects and adverse reactions"[Mesh] OR "adverse effects"[Title/Abstract] OR "toxic"[Title/Abstract] OR "poisoning"[Title/Abstract]))) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) NOT (animals[Mesh] NOT humans[Mesh])',
  二甲双胍:
    '("Metformin"[Title/Abstract] OR "Dimethylbiguanide"[Title/Abstract] OR "Glucophage"[Title/Abstract] OR "Metformin"[MeSH Terms]) AND ("adverse effects"[Title/Abstract] OR "toxicity"[Title/Abstract] OR "side effects"[Title/Abstract] OR "adverse drug reaction"[Title/Abstract] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH Terms] OR toxicity[Subheading]) AND ("Case Reports"[Publication Type] OR "Clinical Trial"[Publication Type]) NOT ("Animals"[MeSH] NOT "Humans"[MeSH])',
  奥美拉唑:
    '("Omeprazole"[MeSH] OR "Omeprazole"[Title/Abstract] OR "奥美拉唑"[Title/Abstract] OR "Losec"[Title/Abstract] OR "Prilosec"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract] OR "adverse"[Title/Abstract] OR "bone fracture"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) AND (2023[dp] OR 2024[dp] OR 2025[dp] OR 2026[dp]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
  塞来昔布:
    '("Celecoxib"[MeSH] OR "Celecoxib"[Title/Abstract] OR "塞来昔布"[Title/Abstract] OR "Celebrex"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract] OR "adverse"[Title/Abstract] OR "cardiovascular events"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) AND (2023[dp] OR 2024[dp] OR 2025[dp] OR 2026[dp]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
  对乙酰氨基酚:
    '("Acetaminophen"[MeSH] OR "Acetaminophen"[Title/Abstract] OR "对乙酰氨基酚"[Title/Abstract] OR "Paracetamol"[Title/Abstract] OR "Tylenol"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract] OR "adverse"[Title/Abstract] OR "hepatotoxicity"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) AND (2023[dp] OR 2024[dp] OR 2025[dp] OR 2026[dp]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
  孟鲁司特:
    '("Montelukast"[MeSH] OR "Montelukast"[Title/Abstract] OR "孟鲁司特"[Title/Abstract] OR "Singulair"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract] OR "adverse"[Title/Abstract] OR "neuropsychiatric events"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) AND (2023[dp] OR 2024[dp] OR 2025[dp] OR 2026[dp]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
  华法林:
    '("Warfarin"[MeSH] OR "Warfarin"[Title/Abstract] OR "华法林"[Title/Abstract] OR "Coumadin"[Title/Abstract] OR "Jantoven"[Title/Abstract]) AND ("adverse effects"[Subheading] OR "toxicity"[Subheading] OR "Drug-Related Side Effects and Adverse Reactions"[MeSH] OR "side effect"[Title/Abstract] OR "adverse reaction"[Title/Abstract] OR "toxic"[Title/Abstract] OR "adverse"[Title/Abstract] OR "major bleeding"[Title/Abstract]) AND ("Case Reports"[pt] OR "Clinical Trial"[pt]) AND (2023[dp] OR 2024[dp] OR 2025[dp] OR 2026[dp]) NOT ("Animals"[Mesh] NOT "Humans"[Mesh])',
};

export const literatureData = [
  {
    drugName: "阿司匹林",
    pmid: "42152719",
    title:
      "Wrist-AnkleAcupunctureonPostoperativeNauseaandVomitingProphylaxisinHigh-RiskFemalePatients:APragmatic,Randomized,Single-Blind,Sham-ControlledTrial.",
    abstract:
      "BACKGROUND:Postoperativenauseaandvomiting(PONV)affectsupto80%ofhigh-riskpatients,compromisingEnhancedRecoveryAfterSurgery(ERAS)outcomesandprolonginghospitalization.Thisrandomizedcontrolledtrialevaluatedwrist-ankleacupuncture(WAA)efficacyforPONVpreventioninhigh-riskfemalesurgicalpatients.METHODS:Thissingle-center,randomized,patient-andassessor-blinded,sham-controlledtrialenrolledfemalepatients(aged18-60years,ASAI-II)scheduledforelectivesurgeryundergeneralanesthesiawithdocumentedmotionsicknessorpreviousPONV.ParticipantsreceivedeitherWAA(sterileneedlesatfourstandardizedacupoints,30-minuteretention)orshamacupuncturepostoperatively.Theprimaryoutcomewas24-hPONVincidenceusingtheRhodesIndexofNausea,Vomiting,andRetching(R-INVR).RESULTS:Among132patients(medianage41years),WAAsignificantlyreduced24-hPONVincidenceversussham(42.4%vs.71.2%;RR0.60,95%CI0.42-0.82;p=0.002).MedianR-INVRscoreswerelowerwithWAA[0(0-5)vs.8(0-11);p<0.001].WAApatientsreportedsignificantlyreducednausea/vomitingat30min,6h,and24h(allp≤0.006)andhighersatisfactionscores(p<0.001).Antiemeticusewascomparable(9.1%vs.16.7%;p=0.299).Noadverseeventsoccurred.CONCLUSIONS:WAAsignificantlyreducedPONVincidenceandseveritywithsustainedeffectsandimprovedsatisfaction,offeringapromisingnon-pharmacologicalpreventionstrategy.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "阿司匹林",
    pmid: "42137119",
    title:
      "EffectofOliceridinePretreatmentonEtomidate-InducedMyoclonus:AProof-of-ConceptRandomizedTrial.",
    abstract:
      "PURPOSE:Etomidateoffershemodynamicstabilityforanesthesiainductionbutfrequentlycausesmyoclonus.Thisstudyevaluatedoliceridine,aG-proteinbiasedμ-opioidreceptoragonist,forpreventionofetomidate-inducedmyoclonus.PATIENTSANDMETHODS:Inthisdouble-blind,randomizedtrial,patientsscheduledforelectivegeneralanesthesiawereallocatedtoreceiveeitherintravenousoliceridine0.03mg/kg(GroupO)oranequivalentvolumeofnormalsaline(GroupNC)5minutesbeforeanesthesiainductionwith0.3mg/kgetomidateadministeredover30-60s.Theprimaryoutcomewastheincidenceofmyoclonuswithin2minutesafteretomidateadministration.Secondaryoutcomewastheseverityofmyoclonus.Perioperativehemodynamicvariables,theincidenceofadverseeventsandpostoperativepainintensity(assessedusingtheNumericalRatingScale)wererecorded.RESULTS:Of93patientswhocompletedthestudy,GroupOshowedlowermyoclonusincidence(10.9%vs57.4%;P<0.001),withrelativerisk0.189(95%CI:0.080-0.421)andthenumberneededtotreat2.147(95%CI:1.495-3.222).NoseveremyoclonusoccurredinGroupO(vs2.1%inNC),withfewermild-moderatecases.Onpostoperativeday1,GroupOalsohadlowerpainscoresbothatrest(0.9±0.8vs1.3±0.9;P=0.020)andduringactivity(1.2±1.1vs1.8±1.1;P=0.017).Hemodynamicvariableswerecomparable,andnosignificantdifferencesinadverseeventsweredetectedbetweengroups.CONCLUSION:Inthissingle-centerproof-of-conceptrandomizedtrialofASAI-IIpatients,pretreatmentwitholiceridine(0.03mg/kg)beforeetomidateinductionreducedtheincidenceofetomidate-inducedmyoclonus.Thestatisticallylowerpostoperativeday1painscoresintheoliceridinegroupshouldbeinterpretedcautiously,andthesefindingswarrantconfirmationinlargermulticentertrialsinvolvingbroaderpatientpopulations.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "阿司匹林",
    pmid: "42125219",
    title:
      "RemimazolamversusSevofluraneforPaediatricCircumcision:ARandomisedControlledTrialEvaluatingEmergenceDelirium.",
    abstract:
      "BACKGROUND:Emergencedeliriumcomplicatesupto40%ofpaediatricsevofluraneanaesthetics.Remimazolamisanultra-short-actingbenzodiazepinewithorgan-independentesterasemetabolism,offeringrapidandpredictablerecovery.Wetestedwhetherremimazolammonotherapycouldserveasavolatile-freealternativetoreduceemergencedelirium.METHODS:Weconductedaprospective,randomised,assessor-blindedtrial(ChiCTR2500095974).Onehundredchildrenaged3-12years(ASAI-II)undergoingcircumcisionwererandomised1:1toremimazolam(0.3mgkg-1induction;0.75mgkg-1h-1maintenance)orsevoflurane(8%induction;1.5-2.5MACmaintenance).Allreceivedpenilenerveblock.Theco-primaryoutcomeswereinductionandemergencetimes.Thekeysecondaryoutcomewasemergencedelirium(PAEDscore≥12).RESULTS:Emergencewasfasterwithremimazolam(10.7[SD3.9]vs13.5[3.7]min;P<0.001).Inductionwasslower(80.8[9.8]vs52.3[8.2]s;P<0.001)duetotheslow-injectionprotocol.Emergencedeliriumoccurredin6/50(12%)remimazolampatientsversus18/50(36%)sevofluranepatients(relativerisk0.33;95%CI0.14-0.77;P=0.009;NNT4.2).PACUstaywasshorter(33.4[8.5]vs40.7[10.9]min;P<0.001).Guardiananxietyreductionwasthreefoldgreaterwithremimazolam.Hypotensionoccurredin6/50(12%)remimazolamversus1/50(2%)sevofluranepatients(P=0.11);allcaseswerefluid-responsive.CONCLUSION:Remimazolammonotherapyreducedemergencedeliriumby67%comparedwithsevoflurane,yieldingfasterrecoveryandimprovedfamilyexperience.However,atrendtowardstransienthypotensionwarrantsappropriatepreoperativefluidmanagement.Largermulticentretrialsareneededtoconfirmsafetyandbroaderapplicability.",
    hasAdverse: "疑似",
    confidence: "低",
    reason: "摘要中少量提及ADR关键词（safety），需人工确认",
  },
  {
    drugName: "阿司匹林",
    pmid: "42120081",
    title:
      "Efficacyofdualantiplatelettherapyforthreemonthsversus12monthsaftercoronaryarterybypassgrafting:multicentre,doubleblinded,randomisedcontrolledtrial.",
    abstract:
      "OBJECTIVES:Toevaluatetheefficacyofdualantiplatelettherapy(DAPT)forthreemonthsversus12monthsinsaphenousveingraftocclusionwhilereducingbleedingrisk.DESIGN:Multicentre,non-inferiority,doubleblind,randomisedcontrolledtrial.SETTING:13cardiacsurgerycentresinChina,withenrolmentbetweenFebruary2023andJuly2024.PARTICIPANTS:2300participantsaged18to80yearswhounderwentelectiveprimarycoronaryarterybypassgraftingwith≥1saphenousveingraft.INTERVENTIONS:Participantswererandomlyassigned(1:1)toreceiveDAPT(ticagrelor90mgtwicedailyplusaspirin100mgoncedaily)for12monthsorthesamedualantiplateletregimenforthefirstthreemonths,followedbyplaceboplusaspirinforninemonths.MAINOUTCOMEMEASURES:Theprimaryoutcomesweresaphenousveingraftocclusionatoneyear(non-inferiority)andBleedingAcademicResearchConsortium(BARC)type2,3,or5bleeding(superiority).Secondaryoutcomesweremajoradversecardiovascularevents(MACCE),saphenousveingraftfailure,venousorarterialgraftstenosis,andvenousorarterialgraftocclusion.RESULTS:2290patients(meanage61.5(standarddeviation(SD)8.4)years,20.6%(n=472)women)wereincludedinthemodifiedintention-to-treatset.Themeannumberofsaphenousveingraftsegmentswas2.5(SD0.8).2070patients(90.4%)withatotalof5125saphenousveingraftsegmentswereassessedatoneyear.Saphenousveingraftocclusionoccurredin280of2596(10.8%)inthethreemonthDAPTgroupand283of2529(11.2%)inthe12monthDAPTgroup(absolutedifference-0.31%,95%confidenceinterval(CI)-3.13%to2.52%;P=0.008fornon-inferiority).Duringamedianfollow-upof368(interquartilerange358-382)days,BARCtype2,3,or5bleedingoccurredin95patients(8.3%)inthethreemonthDAPTgroupand149patients(13.2%)inthe12monthDAPTgroup(absolutedifference-4.67%,95%CI-7.18%to-2.16%;P<0.001).Thenumberneededtotreattopreventonebleedingeventwas21(95%CI13to46).MACCEoccurredin26(2.3%)patientsinthethreemonthDAPTgroupand27(2.7%)inthe12monthDAPTgroup(absolutedifference-0.11%,95%CI-1.48%to1.26%).Thefindingsforothersecondaryoutcomeswerealsosimilarbetweenthetwogroups.CONCLUSIONS:AthreemonthDAPTstrategywasnon-inferiortothe12monthDAPTstrategyinsaphenousveingraftocclusionandwassuperiorinreducingbleedingrisk.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,bleeding）",
  },
  {
    drugName: "阿司匹林",
    pmid: "42119034",
    title:
      "Areage,comorbidity,andfrailtyassociatedwithcomplicationsafterminimallyinvasiveesophagectomy?Amulticentercohortstudy.",
    abstract:
      "BACKGROUND:Perioperativerisksinolder,comorbid,andfrailpatientsundergoingopenesophagectomyareincreased,whereastheserisksremainuncertainforminimallyinvasiveesophagectomy(MIE).Thisstudyinvestigatestherelationshipbetweenage,comorbidity,frailty,andcomplicationsafterMIE.METHODS:ProspectivedatafromtherandomizedICANtrialwereused,whichcomparedintrathoracicandcervicalanastomosisinadultesophagealcancerpatientsundergoingMIE.Patientswerecategorizedbyage(<75and≥75years),comorbidity(ASA,CharlsonComorbidityindex(CCI),CumulativeIllnessRatingScaleforGeriatrics(CIRS-G)),andfrailty(TOPICS-MDS≥0.20).Primaryoutcome:severecomplications(Clavien-Dindograde≥3a).Secondaryoutcomes:overallcomplications,hospitalandintensivecareunit(ICU)lengthofstay(LOS),andhospitalreadmission.Multivariableregressionanalysisadjustedforgenderandanastomosislocation.RESULTS:Among245patients,87(35.5%)hadseverecomplications.Eighteen(7.3%)wereaged≥75years,49(20%)hadASA≥3,41(16.7%)hadCCI≥2,medianCIRS-Gscorewas3(IQR2.0),and14patients(5.7%)werefrail.Inmultivariableregression,age,ASA≥3,CCI≥2,andCIRS-Gwerenotindependentlyassociatedwithseverecomplications,overallcomplications,readmission,hospitalorICULOS.Multivariableregressionanalysisforfrailtywaslimitedbythesmallnumberoffrailpatients.CONCLUSIONS:OlderandcomorbidpatientsdidnotexperiencehigherratesofseverecomplicationsfollowingMIE,suggestingthattheymaybeconsideredsafecandidatesforMIEdespitetheirage.Whenselectedaccordingtocurrentclinicalpractice,age,andcomorbidityaloneshouldnotruleoutsurgicalconsideration.",
    hasAdverse: "否",
    confidence: "低",
    reason: "未检测到明显的不良反应关键词",
  },
  {
    drugName: "布洛芬",
    pmid: "42051372",
    title:
      "DiagnosticChallengesinaPediatricCaseofRecurrentBlisteringSkinReactions:Ibuprofen-InducedFixedDrugExanthemaversusInfection-TriggeredErythemaMultiforme.",
    abstract:
      "A12-year-oldpatientwashospitalizedwithsuspectedrecurrentStevens-Johnsonsyndrome(SJS)causedbyibuprofen.Thepatientpresentedwithaphthouslesionsonthelipsandoralmucosa,accompaniedbyfeverandcough.Furtherexaminationrevealedmoreseveresymptoms.Theexactclassificationofhisskinreactionandtheunderlyingcausewerechallengingduetothecoexistenceofmultiplepotentialtriggers.Thediagnosticoverlapamongvariousskinreactionsrequirescarefulevaluationoftheclinicalpresentationandhistopathologicalfindingsinrelationtopotentialdrugexposureand/orinfectioustriggers.CutaneousreactionssuchasSJSandfixeddrugexanthemaarepredominantlyassociatedwithdrugexposure,whereasErythemamultiforme(EM)andMycoplasmapneumoniaerashandmucositis(MIRM)aremainlylinkedtoinfectioustriggers.Thediagnosisofaskinreactionanditstriggerishighlyrelevantfortherapyandpreventionoffurtherepisodes.Inthispatient,administrationofibuprofen,aswellasinfectionswithHerpessimplexvirus(HSV)andMycoplasmapneumoniae(M.pneumoniae)wereconsideredpotentialtriggers,highlightingthecomplexityofthiscase.Thepatientrecoveredfollowingextensivetherapyandwasdischargedaftertwoweeks.",
    hasAdverse: "是",
    confidence: "高",
    reason: "标题直接提及ADR关键词（infection），摘要命中1个相关词",
  },
  {
    drugName: "布洛芬",
    pmid: "42046557",
    title: "Ibuprofen-InducedPemphigusVulgaris:ACaseReport.",
    abstract:
      'PemphigusVulgaris(PV)isachronicautoimmuneblisteringdisease.Althoughpharmacologicalagents,particularlythosecontainingthiolgroups,havebeenidentifiedasprecipitatingfactors,reportsofnon-thioldrugs,suchasnonsteroidalanti-inflammatorydrugs(NSAIDs),causingPVremainlimited.Wereportacaseofa41-year-oldMyanmarfemalewhodevelopedgeneralizedbullouseruptions,oralulcers,andocularpainaftertheconcurrentuseofibuprofenandpenicillinV.Shepresentedwithextensivecutaneouserosionscomplicatedbysepsisandmalnutrition.AlthoughpenicillinVwasinitiallysuspected,acausalityassessmentperformedbyapharmacistusingtheNaranjoalgorithmidentifiedibuprofenasthe"probable"culpritofthereaction.Thisassessmentiscrucialforguidingsubsequenttherapeuticdecisions.Thepatientwassuccessfullymanagedwithsystemiccorticosteroids,nutritionalsupport,andantibiotics.Importantly,theexclusionofpenicillinallergyallowedtheuseofpiperacillin/tazobactamtoeffectivelytreatsepsis.Thisrarecaseofibuprofen-inducedPVhighlightsthecriticalroleofpharmacistsinperformingadversedrugreactionassessmentstoaccuratelyidentifythecausativeagent,therebyenablingsafeandeffectivetherapeuticdecision-making.',
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "布洛芬",
    pmid: "42044413",
    title:
      "AnExtremelyRareCaseofSequentialOnsetofStreptococcalToxicShockSyndromeandKawasakiDiseaseFollowingVaricellaInfectionina2.5-Year-OldGirl.",
    abstract:
      "Varicellaisacommonviraldiseaseofchildhoodthatisusuallybenignandself-limiting,butitcanleadtorarecomplications,includingstreptococcaltoxicshocksyndrome(STSS)andKawasakidisease(KD).Thesimultaneousorsequentialoccurrenceofthese2complicationsaftervaricellahasbeenreportedveryrarely.A2.5-year-oldgirlpresentedwithfever,swelling,andneckerythema5daysaftervaricellainfectionandahistoryofibuprofenuse.Shewasadmittedwithadiagnosisofcellulitis.Despiteinitialantibiotictherapy,thepatient'sclinicalconditionrapidlydeteriorated,andshedevelopedshock,thrombocytopenia,organfailure,andpleuraleffusion.Thepatientwastransferredtothepediatricintensivecareunit,intubated,andreceivedIntravenousImmunoglobulin(IVIG).Bloodculturerevealedbeta-hemolyticStreptococcusgroupA,confirmingthediagnosisofSTSS.Afterrecoveryanddischargefromthehospital,thechildpresentedagainwithfeverandpeelingfingertipsandwasadmittedwithsuspicionofKD.Echocardiographyrevealedcoronaryarteryectasia,andshereceivedIVIGagain.Theectasiaresolvedonsubsequentfollow-up.ThisisoneoftherarestcasesofsequentialoccurrenceofSTSSandKDaftervaricellainfection.Clinicalattentiontounusualcomplicationsofvaricella,timelydiagnosis,andappropriatetreatmentareessentialinpreventingsevereandlong-termoutcomesinpediatricpatients.",
    hasAdverse: "是",
    confidence: "高",
    reason: "标题直接提及ADR关键词（infection,toxic），摘要命中2个相关词",
  },
  {
    drugName: "布洛芬",
    pmid: "42003280",
    title:
      "Phase2trialofexerciseandlow-doseibuprofenforcancer-relatedcognitiveimpairmentinpatientsreceivingchemotherapy.",
    abstract:
      "BACKGROUND:Interventionsforcancer-relatedcognitiveimpairmentareunderstudied,particularlyduringtherapy.METHODS:Patientswithcancerreceivingchemotherapyreportingcognitiveproblemswererandomizedtooneoffourstudyarmsfor6weeksinthisphase2randomizedcontrolledtrialwitha2×2factorialdesign.Studyarmsincluded:ExerciseforCancerPatients©®(EXCAP)-ibuprofen,EXCAP-placebo,ibuprofenonly,andplaceboonly.EXCAPisahome-based,lowtomoderate-intensity,progressivewalkingandresistanceexerciseprescription.Cognitiveandbiologicassessmentswereconductedatbaselineandpost-intervention.RESULTS:Eighty-sixparticipantswererandomized(meanage,53.60;88.37%female).Between-groupanalysesshowedthatparticipantsintheEXCAP-placebogroupdemonstratedsignificantlybetterattentionperformanceontheTrailMakingTestcomparedtotheplacebogroup(-21.57seconds,p<0.001;Cohen'sd=-1.31;95%CI,-2.18to-0.44;lowertimesindicatebetterperformance).Theibuprofenonlygroupshowedgreaterimprovementsthantheplacebogroup(-11.27-seconddifference,p=0.05;Cohen'sd=-0.73;95%CI,-1.57to0.11).BothEXCAP-ibuprofenandEXCAP-placeboparticipantsexhibitedimprovementsontheFACT-Cog\"commentsfromothers\"comparedtoplacebo(Cohen'sd=1.00;95%CI,0.35to1.65andCohen'sd=0.65;95%CI,-0.01to1.31).OnRapidVisualProcessingmeanlatency,participantsintheEXCAP-placebogrouphadasignificantimprovementcomparedtoplacebo(Cohen'sd=-1.10;95%CI,-1.97to-0.23);thosereceivingibuprofenhadanimprovementcomparedtoplacebo,whichrevealedatrendafteradjustingforreadingscore(Cohen'sd=-1.04;95%CI,-2.06to-0.01).TheibuprofengroupperformedlesswellontheHopkinsVerbalLearningTest-Reviseddelayedcomparedtothosenotreceivingibuprofen(Cohen'sd=-0.64;95%CI,-1.21to-0.07).CONCLUSIONS:Exerciseandlow-doseibuprofenimprovedsomedomainsofcognitivefunction,althougheffectswerenotobservedacrossallmeasures.Phase3trialsareneeded.",
    hasAdverse: "否",
    confidence: "低",
    reason: "未检测到明显的不良反应关键词",
  },
  {
    drugName: "布洛芬",
    pmid: "41994673",
    title:
      "ACaseofAcutePericarditisandHypereosinophiliaAfterDupilumabInitiation.",
    abstract:
      "Dupilumabisamonoclonalantibodyapprovedtotreatmultipletype2inflammatoryconditions.Dupilumab-associatedhypereosinophiliaisawell-documentedsideeffectandtypicallydoesnotleadtoclinicalsymptomsorpathologicfindings.Wereporta65-year-oldmanwithasthmaandnasalpolyposiswhopresentedwithpleuriticchestpainaftertwodosesofdupilumab.OurevaluationrevealedperipheralhypereosinophiliaandpericardialthickeningconsistentwithpericarditisoncardiacMRI.Thepatientwastreatedwithibuprofenandcolchicine,didnotrequirecorticosteroids,anddupilumabwasdiscontinued.Subsequently,hiseosinophilcountsnormalized,andhissymptomsresolved.Toourknowledge,thisisthefirstpublishedcaseofdupilumab-inducedhypereosinophiliafollowedbyisolatedpericardialinvolvement.",
    hasAdverse: "疑似",
    confidence: "低",
    reason: "摘要中少量提及ADR关键词（sideeffect），需人工确认",
  },
  {
    drugName: "布洛芬",
    pmid: "41774284",
    title:
      "Surgicallyinducednecrotizingscleritisafterorbitalsurgerywithintraconaltumorexcision:acasereport.",
    abstract:
      "BACKGROUND:Surgicallyinducednecrotizingscleritis(SINS)isablindingoculardiseasecharacterizedbyinflammationwithscleralnecrosis.Itoccursasearlyasonedayafterocularsurgery,althoughitcanalsooccuryearslater.Commonly,itoccursafterpterygiumandcataractsurgeriesCASEPRESENTATION:Here,wereportacaseofa40-year-oldwomanwithunderlyingdiabetesmellituswhounderwentasuccessfulexcisionalbiopsyviaaswinginguppereyelidapproachwithlateralcanthotomyandcantholysis,alongwithdisinsertionofthesuperiorandlateralrectusmuscles,foranorbitalcavernousvenousmalformation.However,9weekspostoperatively,thepatientdevelopedpersistentpainintherighteye(RE),especiallywithlateralgaze,whichwasnotrelievedwithoralibuprofen.At16weekspostoperative,anREfocalareaofscleralnecrosiswithsurroundingconjunctivalinjectionwasnotedatthesuperotemporalbulbarregion.MagneticresonanceimagingoftheorbitandbrainrevealedREfocalthickeningattheposterolateralsclera,posteriortothelateralrectusmuscleinsertion,suggestingposteriorscleritis.Thepatientwastreatedwithoralprednisolone(40mg/day)followedbyataperingregimenwithadjunctivemethotrexate(20mg/week).Afterthreemonthsoforalprednisoloneandsixmonthsofmethotrexate,herdiseaseresolvedwithnocomplications.CONCLUSION:SINSisararebutpotentiallysight-threateningcomplicationfollowingorbitalsurgerywithintraconaltumorexcision.Persistentpaincanbeausefulcluebeforetheclinicalsignsbecomeapparent.",
    hasAdverse: "否",
    confidence: "低",
    reason: "未检测到明显的不良反应关键词",
  },
  {
    drugName: "布洛芬",
    pmid: "41708366",
    title:
      "EffectofCombinedDeepandSuperficialSerratusAnteriorPlaneBlockVersusDeepSerratusAnteriorPlaneBlockonPostoperativePainAfterVideo-AssistedThoracoscopicSurgery:AProspectiveRandomizedTrial.",
    abstract:
      "OBJECTIVES:Thisstudyaimedtocomparetheanalgesicefficacyofacombineddeepandsuperficialserratusanteriorplaneblock(SAPB)withdeepSAPBaloneinpatientsundergoingvideo-assistedthoracoscopicsurgery(VATS).DESIGN:Aprospective,randomizedclinicaltrial.SETTING:Single-center,academichospital.PARTICIPANTS:SixtypatientsundergoingelectiveVATS.INTERVENTIONS:OnegroupreceivedacombineddeepandsuperficialSAPB(each15mLof0.375%bupivacainewithepinephrine5µg/mLinjectedbothdeeptoandabovetheserratusanteriormuscle)(groupDS),whiletheothergroupreceived30mLofthesamesolutiondeepintotheserratusanteriormuscleonly(groupD).Additionally,5mLof0.25%bupivacainewasinfiltratedatthechesttubeinsertionsiteinallpatients.Standardizedmultimodalanalgesiaincludedintravenousmorphine(0.1mg/kg),paracetamol(1,000mg),andibuprofen(800mg),administered30minutesbeforetheendofsurgery.Postoperativeanalgesiawasmaintainedwithintravenouspatient-controlledfentanyl.MEASUREMENTSANDMAINRESULTS:Demographicandoperativecharacteristicswerecomparablebetweenthegroups.Totalpostoperativeopioidconsumptionwithin24hours,expressedinmorphinemilligramequivalents,was27.12±16.67mgingroupDand32.84±19.86mgingroupDS,withnosignificantdifferencebetweengroups(p=0.137).Thetotalamountofrescueanalgesiawas11.67±11.47mgingroupDand16.33±12.45mgingroupDS,withnostatisticallysignificantdifferencebetweenthegroups(p=0.141).Postoperativepainscoresandtheincidenceofopioid-relatedadverseeffectsweresimilarbetweengroups(p>0.05forall).CONCLUSIONS:ThisstudydemonstratesthatasingledeepSAPBprovidesequivalentpostoperativeanalgesiatocombinedsingleanddeepSAPB.Bothtechniquesofferedcomparablepostoperativeanalgesiaandsafetyprofiles.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "布洛芬",
    pmid: "41706381",
    title:
      "HepaticSafetyofAdjunctiveHigh-DoseMelatonininParticipantsReceivingOcrelizumabforPrimaryProgressiveMultipleSclerosis:LiverToxicityFindingsfromaPhaseI/IIRandomisedClinicalTrial(MELATOMS-1).",
    abstract:
      "BACKGROUNDANDOBJECTIVES:Basedonmelatonin'sneuroprotectiveeffectsinpre-clinicalmultiplesclerosismodels,theMELATOMS-1studywasdesignedtoevaluatemelatonintreatmentinpatientswithprimaryprogressivemultiplesclerosis(PP-MS)receivingocrelizumabtreatment.Thetrialwasprematurelyhaltedduetohypertransaminasemia.Thisstudyaimedtoanalyseobservedcasesofhypertransaminasemiaandexplorepotentialunderlyingmechanisms,focusingondrug-druginteractions.METHODS:ThisstudyreportsfindingsfromMELATOMS-1(NCT03540485),amulticentre,phaseI/II,randomised,double-blind,placebo-controlledtrialconductedinthemultiplesclerosisunitsofHospitalUniversitarioVirgenMacarena,HospitalUniversitarioVirgendelRocíoandHospitalVithasNisaofSeville.Thetrialwasdesignedtoevaluatethesafetyandefficacyofhigh-doseoralmelatonin(300mg/day)asanadjuncttherapyforpatientswithPP-MS(ExpandedDisabilityStatusScale2-7)onstableocrelizumabtherapy(>9months).Participantswereassigned1:1bystratifiedrandomisation(basedonMSseverityscore)toreceiveeitherdailyoralmelatoninoramatchingplacebo30minbeforebedtime.Safetywasevaluatedbymonitoringadverseeventsandscheduledbiochemicalanalyses,includingroutineliverfunctiontests[alanineaminotransferase(ALT),aspartateaminotransferase(AST),gamma-glutamyltransferase(GGT),alkalinephosphatase(ALP)andbilirubin,quantifiedbyautomatedimmunoassay],every3monthsforupto2years(thetrial'sendpoint).Thetrialwastemporarilystoppedaftergrade1-2hepatotoxicitywasidentifiedinthreepatients,accordingtothescaleoftheinternationalDILIexpertworkinggroup.Asubsequentposthoccausalityanalysisfocusedonpotentialdrug-drugpharmacokineticinteractionsbetweenhigh-dosemelatoninandthepatients'polypharmacyinvolvingcytochromeP450(CYP)enzymepathways.Theanalysisfocusedonconcomitantmedicationsincludingacetaminophen,metamizole,omeprazole,ibuprofen,acetylsalicylicacid,nabiximolandtizanidine.RESULTS:Thetrialwasprematurelystoppedandunblindedaftereightpatientshadbeenrecruited.Threeoutofthefourpatientsreceivingmelatonindevelopedhypertransaminasemia,whichresolvedaftertreatmentdiscontinuation.Allaffectedpatientswerewomentakingpolymedicationsmetabolizedthroughsharedhepaticpathwayswithmelatonin,suggestingapossibleinteractionleadingtohepaticoverload.Incontrast,theonlymaleparticipantinthearm,whodidnottakemedicationsthatsharedmetabolismwithmelatonin,experiencednoadverseliver-relatedeventsduringhis14-monthtreatmentperiod.CONCLUSIONS:Despitethefactthatmelatoninhasagoodsafetyprofile,thesefindingsraiseconcernsregardingthehepatotoxicpotentialofhighdosesofmelatonininpolymedicatedpatients.Thisisattributedtoaprobablepharmacokineticdrug-druginteractionwithconcomitantmedicationssharinglivermetabolizationpathwayswithmelatonin,leadingtoCYP450metabolicpathwayssaturation.Thoughthesefindingsshouldbeinterpretedwithcautionduetothesmallsamplesizeandheterogeneityofthestudypopulation,andfurtherstudiesareneededtoelucidatetheunderlyingmechanismsandestablishsafetyguidelines,thisstudyrevealsacriticalsafetyeventthatrequirescarefulconsiderationwhendesigningfutureclinicaltrialsinvolvinghigh-dosemelatonin,especiallyinpolymedicatedpopulations.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中8个ADR关键词（advers,safety,toxic,druginteraction,adverse）",
  },
  {
    drugName: "布洛芬",
    pmid: "41661090",
    title:
      "OutcomeafterSelectiveearlytreatmentforClosureofpatentductusARteriosusinpretermbabies,amulticentre,masked,randomisedplacebo-controlledparallelgrouptrial(Baby-OSCARtrial).",
    abstract:
      "BACKGROUND:Inextremelypretermbabies,bornbefore28weeks'gestation,alarge(≥1.5mmindiameter)patentductusarteriosuspresentbeyond3daysofageisassociatedwithhighermortalityandmorbiditythaninfantswithoutapatentductusarteriosus.Thecyclooxygenaseinhibitoribuprofenmaybeusedtotreatpatentductusarteriosus.Whetherselectiveearlytreatmentofalargepatentductusarteriosuswithibuprofenimproveshealthanddevelopmentaloutcomesisnotknown.METHODS:Weconductedamulticentre,randomised,double-blind,placebo-controlledtrialevaluatingearlytreatment(≤72hoursafterbirth)withibuprofenforalargepatentductusarteriosusinextremelypreterminfants.Theprimaryoutcomewasacompositeofdeathormoderateorseverebronchopulmonarydysplasiaat36weeks'ofpostmenstrualage.Theshort-termsecondaryoutcomesincludedcomplicationsofprematurity,patentductusarteriosusclosureandsideeffectsoftreatment.Themainlong-termoutcomewassurvivalwithoutmoderateorsevereneurodevelopmentalimpairment,usingparentreportorclassifiedbyblindedend-pointreviewcommitteeat24monthsofcorrectedage.Othersecondaryoutcomesincludedsurvivalwithoutrespiratorymorbidityanddurationofoxygensupplementation.Ahealtheconomicevaluationwasundertaken.RESULTS:Atotalof326infantswererandomisedtoibuprofenand327toplacebo.Theprimaryoutcomeoccurredin220/318infants(69.2%)intheibuprofengroupandin202/318infants(63.5%)intheplacebogroup(adjustedriskratio1.09,95%confidenceinterval0.98to1.20;p=0.10).Atotalof44of323infants(13.6%)intheibuprofengroupand33of321infants(10.3%)intheplacebogroupdiedby36weeksofgestation(adjustedriskratio1.32,95%confidenceinterval0.92to1.90).Twounforeseeableseriousadverseeventsoccurredthatwerepossiblyrelatedtoibuprofen.At24monthsofcorrectedage,outcomedatawereavailablefor263and274childrenintheibuprofenandplacebogroups,respectively.Survivalwithoutmoderatetosevereneurodevelopmentalimpairmentintheibuprofenandplacebogroupswas131/248(53.0%)and134/259(51.9%),respectively;adjustedriskratio1.01(95%confidenceinterval0.86to1.18);p=0.901.Survivalwithoutrespiratorymorbiditywas66/210(31.4%)and74/220(33.6%),respectively;adjustedriskratio0.92(95%confidenceinterval0.70to1.20);p=0.536.Mediandurationofoxygensupplementationwas76.0and78.0days,respectively.CONCLUSION:Theriskofdeathormoderateorseverebronchopulmonarydysplasiaat36weeksofpostmenstrualagewasnotstatisticallysignificantlylowerforextremelypreterminfantsrandomisedtoearlytreatmentwithibuprofencomparedtoplacebo.Therewasnoevidenceofanimprovementinsurvivalwithoutmoderatetosevereneurodevelopmentalimpairmentorsurvivalwithoutrespiratorymorbidityat24months'correctedage,afterselectiveearlytreatmentofalargepatentductusarteriosuswithibuprofeninchildrenbornextremelypreterm.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中5个ADR关键词（advers,mortality,sideeffect,adverse,death）",
  },
  {
    drugName: "二甲双胍",
    pmid: "42135901",
    title:
      "EmpagliflozinasanAlternativetoMetforminforAntipsychotic-RelatedWeightGain:Double-BlindRandomizedControlledTrial.",
    abstract:
      "BACKGROUND:Weightgainandmetabolicdisturbancesarecommonadverseeffectsofantipsychoticmedicationssuchasclozapineandolanzapine.Beyondtheirprimaryroleinglycemiccontrol,sodium-glucosecotransporter2(SGLT2)inhibitorshavebeenassociatedwithweightlossandimprovementsinvariousmetabolicparameters.Thisstudycomparedtheefficacyandsafetyofempagliflozinandmetformininpatientswithantipsychotic-inducedweightgain(AIWG).METHODS:Inthis12-week,double-blind,randomizedcontrolledtrial,84adultswithschizophreniaorbipolardisorderandestablishedweightgainfromclozapineorolanzapinewereassignedtoreceiveeitherempagliflozin(10mgdaily)ormetformin(1000mgdaily).Theprimaryoutcomewasthepercentagechangeinbodyweightfrombaselinetoweek12.Secondaryoutcomesincludedchangesinabsolutebodyweight,bodymassindex(BMI),waistcircumference,waist-hipratio,andtheproportionofpatientsachieving≥5%weightloss.Exploratoryoutcomesassessedchangesinglycemicandlipidparameters,fastinginsulin,andinsulinresistance(HOMA-IR).Safetywasevaluatedbymonitoringadverseevents,treatmentdiscontinuations,andseriousadverseevents.RESULTS:Ofthe84randomizedparticipants,38(90.5%)intheempagliflozingroupand39(92.9%)inthemetformingroupcompletedthe12-weekstudy.Bothtreatmentsproducedsignificantwithin-groupreductionsinanthropometricmeasures(allp<0.001)andtherewerenostatisticallysignificantdifferencesbetweengroupsinthemagnitudeofchangeforbodyweight,BMI,waistcircumference,hipcircumference,orwaist-hipratio(allp>0.05).Bothgroupsshowedimprovementsinglycemicandlipidparameters,butempagliflozinresultedinsignificantlygreaterreductionsinTG(p=0.004),fastinginsulin(p=0.005),andHOMA-IR(p=0.012),aswellasagreaterincreaseinHDL-C(p<0.001)comparedtometformin.Theoverallincidenceofadverseeffectswascomparable(33.3%vs.38.1%;p=0.650),withnoseriousadverseeventsreported.CONCLUSIONS:Thesefindingssuggestthatempagliflozinisapromisingalternativetometforminformanagingmetaboliccomplicationsinpatientstreatedwithclozapineorolanzapine.Thesefindingswarrantconfirmationandfurtherinvestigationinlarger,long-termstudies.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "二甲双胍",
    pmid: "42135902",
    title:
      "Psychosisina47,XXXAdolescent:ClinicalManagementandMultidisciplinaryFollow-up.",
    abstract:
      'TripleX(47,XXX)syndromeisasexchromosomeaneuploidyassociatedwithlearningdisabilities,attentionaldeficits,andsocialimpairments.Itspsychiatricmanifestations,particularlypsychosis,remainunderrecognized.Thiscasereportdescribesa13-year-oldgirlwith47,XXXsyndromewhodevelopedtworecurrentpsychoticepisodesduringadolescenceandultimatelyachievedsustainedremissionunderclozapine,illustratingtheneedforindividualized,geneticallyinformedcare.Thepatientinitiallypresentedwithpersecutorydelusions,auditoryhallucinations,behavioralchanges,andfunctionaldecline.Comprehensiveneurological,neuropsychological,andaudiologicalassessmentsshowedaverageoverallcognitivefunctioningandnosyndrome-specificsensoryabnormalities.Psychoticsymptomsemergedyearsaftermethylphenidateinitiationandpersistedduringmedication-freeperiods,arguingagainststimulant-inducedpsychosis.Followingpartialresponseandpoortolerabilitytorisperidoneandaripiprazole,clozapinewasintroducedusinga"startlow,goslow"strategy.Low-doseclozapine(150mg/day)producedcompleteremissionwithintwomonthswithouthematologicalorcardiovascularadverseeffects.Preventivemetforminsuccessfullymitigatedantipsychotic-associatedweightgain.Acoordinatedmultidisciplinaryfollow-upintegratingpsychiatry,generalmedicine,neuropsychology,genetics,andschool-basedinterventionsprovedessentialtomaintainingstability,supportingadherence,andpromotingacademicandsocialfunctioning.Atone-yearfollow-up,thepatientremainedasymptomaticwithimproveddailyfunctioning.',
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要命中ADR关键词（adverse）",
  },
  {
    drugName: "二甲双胍",
    pmid: "42036753",
    title:
      "WhenMetabolismRecoversbuttheBrainDoesNot:ACaseReportofPosteriorReversibleEncephalopathySyndrome(PRES)-LikeEncephalopathyAfterExtremeMetformin-AssociatedLacticAcidosis.",
    abstract:
      "Metformin-associatedlacticacidosis(MALA)isararebutlife-threateningcomplicationofmetformintherapy.Neurologicalmanifestationsareusuallyconsideredreversibleandareclassicallyassociatedwithbasalgangliainvolvementonmagneticresonanceimaging(MRI).A63-year-oldmanwithpreviouslynormalrenalfunctiondevelopedsevereMALAaftercontinuingmetforminduringagastrointestinalillness.Hepresentedwithprofoundmetabolicacidosis(pH6.55),extremelactateelevationto29.9mmol/L,acutekidneyinjury,andhemodynamiccollapserequiringresuscitation.Toxicmetforminlevelsconfirmedthediagnosis.Despiterapidmetabolicstabilizationwithrenalreplacementtherapy,persistentencephalopathyremained.SerialMRIrevealedbilateralcerebellarandposteriorcorticalvasogenicedemawithcontrastenhancement,withoutdiffusionrestriction,consistentwithaposteriorreversibleencephalopathysyndrome(PRES)-likepattern.Severecorticalvisualimpairmentpersisted.ThisisthefirstdetailedreportdescribingaPRES-likeradiologicalpatterninthesettingofconfirmedsevereMALAwithouttheclassicallentiformforksign.Furthermore,wereportasurvivorofaninitiallactatelevelof29.9mmol/L-oneofthehighestlactateconcentrationseverreportedinasurvivingpatient.ThiscasechallengestheassumptionthatneurologicalmanifestationsofMALAareuniformlyreversibleandexpandstheradiologicalspectrumofmetformin-associatedbraininjury.",
    hasAdverse: "是",
    confidence: "高",
    reason: "标题直接提及ADR关键词（lacticacidosis），摘要命中多个相关词",
  },
  {
    drugName: "二甲双胍",
    pmid: "41994667",
    title:
      "TirzepatideandmetformineffectsonhungerandBMIinanadolescentwithhyperphagiaandsevereobesityduetoMC4RDeficiency:acasereport.",
    abstract:
      "INTRODUCTION:Tirzepatide,adualGLP-1/GIPreceptoragonist,isrecentlyapprovedforthetreatmentoftype2diabetesandobesityinadults.Melanocortin-4-receptor(MC4R)deficiencyisthemostcommonmonogeniccauseofobesityandpresentswithhyperphagiaandearlyonsetobesity.WhiletirzepatideseemstobeeffectiveininducingweightlossinadultswithMC4Rdeficiency,itseffectsonhyperphagiaandweightlossinpediatricpatientsareunexplored.CASEPRESENTATION:A17-year-oldgirlwasadmittedtoourspecializedobesityclinicbecauseofhyperphagiaandsevereearly-onsetobesityduetoMC4Rdeficiency.Shehadanextensivehistoryoflifestyleinterventionsandpsychologicalsupportandmaintainedahighlevelofphysicalactivity.Despitetheseefforts,shepresentedwithaBMIof37kg/m2(3.68SDS)andasubstantialpsychosocialburden.Vitalsignsandlaboratoryevaluationsrevealednoobesity-relatedcomplications.Tirzepatidewasinitiatedatadoseof2.5mgweeklyandslowlytitratedtoamaximumdoseof12.5mgweekly.Sheinitiallyexperiencedasubstantialreductioninhyperphagiaandreportedlessfoodnoise,areductioninhungerfeelingsandprolongedpostprandialsatiety.However,after12weekshungerscoresstartedtoincreaseagain,approachingpre-treatmentlevelsat28weeksoffollow-up.Metforminwasaddedat28weeksinanattempttobettermanageofhyperphagia,resultinginareductioninhyperphagia.Despitetheseincreasinghungerfeelingsfromweek12to28,substantialweightlosswasachieved,andthepatientlost-13.9%ofherinitialbodyweightat28weeks.Afteradditionofmetformin,thepatientlostanadditional-7%ofherweight.Totalbodyweightreductionatweek37was-20.9%.Tirzepatidewaswelltolerated,withnoadverseeffectsreportedat41weeksoffollow-up.CONCLUSION:ThiscasereportsuggeststhattirzepatideiseffectiveinreducingbodyweightinadolescentswithMC4Rdeficiency.",
    hasAdverse: "否",
    confidence: "低",
    reason: "未检测到明显的不良反应关键词",
  },
  {
    drugName: "二甲双胍",
    pmid: "41909343",
    title:
      "WhereIstheLactateComingFrom?AnUnusualPresentationofPersistentLacticAcidosis.",
    abstract:
      "Persistentlacticacidosisinpatientswithmetastaticcolorectalcancerisuncommonandoftenattributedtoimpairedhepaticclearancefromlivermetastases.Acuteworsening,however,maysignalreversiblemetabolicderangements,includingmedication-relatedtoxicity.A64-year-oldmalewithtype2diabetesmellitus,hypertension,andmetastaticcolorectalcancertotheliverpresentedwithweakness,lethargy,andinabilitytotolerateoralintakeforthreedays.Hisbaselinelactatewaspersistentlyelevated(5-7mmol/L)oversixmonths.Onpresentation,hewashypotensive[bloodpressure(BP)82/41mmHg],tachycardic[heartrate(HR)122bpm],febrile(101°F),anddrowsy.Labsshowedacutekidneyinjury(AKI)(Cr2.7mg/dL),hyperkalemia[Potassium(K)6.1mmol/L],severemetabolicacidosis(bicarbonate4mmol/L),transaminitis[aspartateaminotransferase(AST)424,alaninetransaminase(ALT)576],andlactate18mmol/L.Completebloodcountshowedawhitebloodcell(WBC)countof19,000/µL.Computedtomography(CT)oftheabdomenrevealedtheknown7cmcolorectalmasswithmultiplehepaticmetastases,moderateascites,andnoobstructionorischemia.Despiteaggressiveintravenous(IV)fluidsandvasopressors,lactateroseto20mmol/L,andurineoutputremainednegligible.Medicationreviewrevealedmetforminuse,raisingsuspicionformetformin-associatedlacticacidosis(MALA)inthesettingofAKI.Nephrologyconsultationwasobtained,andcontinuousrenalreplacementtherapy(CRRT)wasinitiated.Lactatedeclinedto12mmol/Latfourhoursand6mmol/Lat12hours.Hemodynamicsimproved,vasopressorswerediscontinued,urineoutputincreased,andcreatinineandbicarbonatenormalizedondaytwo.Eventually,thepatientwassuccessfullyextubated,toleratedoralintake,andwasdischargedhomeaftercompletingantibiotics.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中ADR关键词（lacticacidosis,toxicity）",
  },
  {
    drugName: "华法林",
    pmid: "42153925",
    title:
      "ContainedJuxtarenalAorticPerforationintheSettingofSevereWarfarin-AssociatedCoagulopathy.",
    abstract:
      "INTRODUCTION:Severewarfarin-associatedcoagulopathyisaknowncauseofmajorbleeding;however,itsrelationshipwithlarge-vesselstructuralcomplicationsremainspoorlydefined.Spontaneousruptureorperforationofanonaneurysmalabdominalaortaisrareandmaypresentatypically,particularlywhenhemorrhageiscontained.CASEPRESENTATION:A90-year-oldwomanonchronicwarfarintherapypresentedwithabdominalpainandanunmeasurableinternationalnormalizedratio.Computedtomographydemonstratedacontainedjuxtarenalaorticperforationwitharetroperitonealhematoma,whereaspriorimagingweeksearliershowednoaneurysm.Anticoagulationwasreversedandhemodynamiccontrolwasinitiated.Becauseofhighoperativerisk,shewastransitionedtocomfort-focusedcare.DISCUSSION:Thiscasehighlightsacuteaorticperforationintheabsenceofprioraneurysmaldisease.Althoughanticoagulationisunlikelytodirectlycauserupture,itmayexacerbatehemorrhagefollowingstructuraldisruption,likelyrelatedtounderlyingatheroscleroticorulcerativepathology.CONCLUSION:Earlyimaging,promptreversal,andhemodynamiccontrolareessential,althoughoutcomesremainpoorwithoutdefinitiveintervention.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（bleeding,hemorrhage）",
  },
  {
    drugName: "华法林",
    pmid: "42093249",
    title:
      "LeftAtrialAppendageClosureComplicatedbySpinalEpiduralHematomaandDevice-RelatedThrombosis:ACaseReport.",
    abstract:
      "BACKGROUND:Leftatrialappendageclosure(LAAC)isanimportantapproachforstrokepreventioninpatientswithnon-valvularatrialfibrillation.Anticoagulation-relatedspinalepiduralhematoma(SEH)anddevice-relatedthrombosis(DRT)arerarebutseriouscomplications.CASESUMMARY:Wereportthecaseofan86-year-oldfemalewhopresentedwithasix-monthhistoryofrecurrentchesttightness.Shewasclinicallydiagnosedwithpersistentnon-valvularatrialfibrillationandchronicheartfailure.Followingacomprehensiveevaluation,sheunderwentsuccessfulLAACandwasstartedonedoxaban30mgoncedailyforanticoagulation.Atsixweekspost-procedure,shedevelopedananticoagulation-relatedSEH.Anticoagulationwasimmediatelydiscontinued.Followingconservativemanagement,thehematomaresolvedandhermusclestrengthimproved.Shewassubsequentlystartedonclopidogrel75mgoncedailyforantiplatelettherapy.Atthesix-monthfollow-up,transthoracicechocardiographyandcomputedtomographyangiographyconfirmedalargeDRTintheleftatrium.Anticoagulationwasre-initiatedwithlow-molecular-weightheparinbridgingtowarfarin,withtheinternationalnormalizedratiomaintainedbetween2.0and2.5.Follow-upimagingateightmonthsdemonstratedsignificantresolutionoftheleftatrialthrombus.Duringtheremainderofthefollow-upperiod,nofurthermajoradverseevents,includingischemicstrokeorbleeding,occurred.CONCLUSION:Forpatientswithmultiplehigh-riskfactorsundergoingLAAC,attentionshouldbepaidtodynamicadjustmentofindividualizedantithromboticstrategies,enhancementofperioperativeproceduralqualitycontrol,andstructuredfollow-upwithinkeytimewindows,inordertominimizetheriskofcomplicationsandoptimizethenetclinicalbenefit.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,bleeding）",
  },
  {
    drugName: "华法林",
    pmid: "42060815",
    title:
      "Torsemideandwarfarin:Acautionarycaseofalteredinternationalnormalizedratioandbleedingrisk.",
    abstract:
      "Warfarinisawidelyusedoralanticoagulantwithanarrowtherapeuticindexandmultipledrug-druginteractionsthatmaysignificantlyalteritsanticoagulanteffect.Torsemide,aloopdiureticcommonlyprescribedforheartfailureandfluidoverload,sharesmetabolicpathwayswithwarfarin,raisingthepossibilityofclinicallysignificantinteractions.However,theevidenceregardingthisinteractionremainslimitedandinconsistent.A66-year-oldmalewithahistoryoftype2diabetesmellitus,hypertension,chronickidneydisease,andprioraorticvalvereplacementonchronicwarfarintherapypresentedwithextensivesofttissuenecrosisoftheleftlegfollowingminortrauma.Duringhospitalization,warfarin(3mgoncedaily)andTorsemide(20mgoncedaily)wereinitiatedconcurrently.Subsequently,thepatientdevelopedaprogressiveelevationininternationalnormalizedratio(INR),necessitatingrepeatedfreshfrozenplasmatransfusionsduetoincreasedbleedingrisk.Despitesupportivemanagement,INRremainedelevated.Torsemidewasdiscontinuedandreplacedwithfurosemide,afterwhichagradualstabilizationofINRlevelswasobserved.Thepatientlaterrequiredleftabove-kneeamputationduetoworseningnecrosisbutrecoveredfollowingmultidisciplinarymanagement.AssessmentusingtheNaranjoAdverseDrugReactionProbabilityScalesuggestedapossibleinteractionbetweenwarfarinandTorsemide.ThiscasehighlightsapotentialinteractionbetweenwarfarinandTorsemideresultinginelevatedINRandincreasedbleedingrisk.CliniciansshouldexercisecautionandensurecloseINRmonitoringwheninitiatingTorsemideinpatientsreceivingwarfarintherapy.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中4个ADR关键词（advers,adverse,druginteraction,bleeding）",
  },
  {
    drugName: "华法林",
    pmid: "41960787",
    title:
      "Casereportofapatientwithacenocoumarolresistancefollowingtherapyforinfectiveendocarditiswithrifampicinandgentamicincombinationtherapy.",
    abstract:
      "VitaminKantagonists(VKAs)areessentialforanticoagulationinpatientswithmechanicalheartvalves,butareaffectedbydruginteractions,particularlywithrifampicin-apotentinducerofCYP2C9thatacceleratesVKAmetabolismanddestabilisesINRlevels.A48-year-oldmalewithmultipleaorticvalvereplacementsandinfectiveendocarditisrequiredrifampicintherapypost-surgery.Despiteescalatingdosesofwarfarinandacenocoumarol,therapeuticINRlevelswerenotachieved,requiringlowmolecularweightheparin(LMWH)bridging.INRstabilisationoccurredonlyafterdiscontinuingrifampicin,withadrasticreductioninVKAdoserequirements.ManaginganticoagulationinpatientsonVKAsandrifampicinremainschallengingduetorapidmetabolismandINRfluctuations.CloseINRmonitoring,doseadjustmentsandalternativestrategies,suchastwice-dailyVKAdosingorLMWHbridging,arecrucialformaintainingtherapeuticanticoagulation.",
    hasAdverse: "疑似",
    confidence: "低",
    reason: "摘要中少量提及ADR关键词（druginteraction），需人工确认",
  },
  {
    drugName: "华法林",
    pmid: "41928303",
    title:
      "Criticaluterinebleedingaftermiscarriageinawarfarin-anticoagulatedpatientwithmechanicalheartvalve:acasereport.",
    abstract:
      "BACKGROUND:PatientswithmechanicalheartvalvesrequirelifelongoralanticoagulationwithvitaminKantagonistssuchaswarfarintopreventvalve-associatedthromboembolism.Bleedingcomplicationsduringthistherapyposesignificantclinicalchallengesandnecessitateexpertmanagement.Inparticular,heavyuterinebleedingfollowingmiscarriagerepresentsahigh-riskandemergentsituation.Themanagementofuterinebleedingischallenging,duetotheneedtobalanceanticoagulationwithhemostaticcontrol.ThisreportpresentsacaseofsevereandprolongedbleedingcausedbyretainedproductofconceptioninapatientwithmechanicalheartvalvesreceivingvitaminKantagonisttherapy.CASEPRESENTATION:Wedescribethecaseofa28-year-oldAfricanwomanwithmechanicaldoubleheartvalveprosthesismaintainedonwarfarintherapywhoinitiallyunderwentvacuumcurettageforamissedabortion.Twoweekslater,shepresentedwithheavyvaginalbleeding.Despiteinitialexpectantmanagement,recurrentbleedingepisodesnecessitatedmultipleinterventionsincludingrepeatcurettage,off-labelintrauterinetamponade,bloodtransfusions,andbridgingwithunfractionatedheparin.Persistenthemorrhageledtoattemptedendometrialablation,followedbysuccessfuluterinearteryembolization,whicheffectivelycontrolledhemorrhageandpreservedtheuterus.Thepatientwascloselymonitoredfrombothacardiologicandhemostaticperspective,andanticoagulationtherapywasresumedwithstableprostheticvalvefunctionobservedatdischarge.CONCLUSIONS:Themanagementofmiscarriage-associatedbleedinginpatientsreceivingwarfarinanticoagulationformechanicalheartvalvesiscomplexandnecessitatesinterdisciplinarycollaboration.",
    hasAdverse: "是",
    confidence: "高",
    reason: "标题直接提及ADR关键词（bleeding），摘要命中2个相关词",
  },
  {
    drugName: "塞来昔布",
    pmid: "42078931",
    title:
      "Safety,tolerability,pharmacokinetics,andpharmacodynamicsofzapnometinib:resultsfromaphaseIclinicalstudy.",
    abstract:
      "INTRODUCTION:Zapnometinib(ATR-002)isaselectiveMEKinhibitordesignedtomodulatetheMAPK/ERKpathway,whichplaysakeyroleinviralinfectionsandinflammatorydiseases.Clinicalcharacterizationofitssafety,tolerability,pharmacokinetics(PK),andpharmacodynamics(PD)isessentialtosupportfurtherdevelopment.ThisPhaseIclinicaltrialwasregisteredunderEudraCTnumber2021-005225-25.METHODS:ThiswasaPhaseI,single-center,randomized,double-blind,placebo-controlledtrialconductedinhealthyadults.Thestudyincludedthreeparts:asingleascendingdose(SAD)phase,amultipleascendingdose(MAD)phase,andadrug-druginteraction(DDI)aswellasafood-druginteraction(FDI)phase.IntheSADphase,42participantsreceivedsingleoraldosesof600,900,1,200,or1,500mg.IntheMADphase,29participantsreceiveddailyoraldosesof900,1,200,or1,500mgfor7days.TheDDIphaseassessedtheeffectofzapnometinibonCYP2C8andCYP2C9activityusingrepaglinideandcelecoxibasprobesubstrates.RESULTS:Zapnometinibwaswelltoleratedwithnoseriousadverseeventsreported.Mosttreatment-emergentadverseevents(TEAEs)weremildtomoderate,includinggastrointestinalsymptoms(e.g.,diarrhea,nausea)andheadache.PKanalysisshoweddose-proportionalincreasesinCmaxandAUC,withanotablefoodeffectthatincreasesbioavailability.PDevaluationdemonstratedsignificantMEKinhibition,evidencedbyreducedERKphosphorylation.DISCUSSION/CONCLUSION:Thisphase1studydemonstratesthatzapnometinibhasafavorablesafetyandtolerabilityprofile,predictablepharmacokinetics,andpotentpharmacodynamicactivity.TheresultssupportfurtherclinicaldevelopmentofzapnometinibfortherapeuticindicationsinvolvingdysregulatedMAPK/ERKsignaling.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中6个ADR关键词（advers,safety,druginteraction,adverse,tolerability）",
  },
  {
    drugName: "塞来昔布",
    pmid: "41837970",
    title:
      "SafetyandEfficacyofPrimeCinAmyotrophicLateralSclerosis:ThePARADIGMRandomizedClinicalTrial.",
    abstract:
      "IMPORTANCE:Amyotrophiclateralsclerosis(ALS)isafatalneurodegenerativediseasewithlimitedtreatmentoptions.PrimeCisafixed-doseoralcombinationofcelecoxibandciprofloxacindesignedtotargetALS-relatedmechanisms,includingneuroinflammation,ironhomeostasis,anddysregulatedmicroRNAs.OBJECTIVE:Toevaluatethesafety,tolerability,andpotentialefficacyofPrimeCinpeoplelivingwithALS.DESIGN,SETTING,ANDPARTICIPANTS:Thiswasarandomized,double-blind,placebo-controlled,phase2btrialconductedat4ALSreferralcentersfromMay2022toNovember2023andfollowedby12-monthopen-labelextension.AdultswithdefiniteorprobableALSanddiseasedurationof30monthsorlesswereeligible.Of73screened,69wererandomizedand68wereincludedintheintent-to-treatpopulation.INTERVENTIONS:Participantswererandomized2:1toreceivePrimeCorplacebofor6months,followedbyopen-labelextensionPrimeCforall.MAINOUTCOMESANDMEASURES:Theprimaryoutcomewassafetyandtolerability.Theprespecifiedprimarybiomarkeroutcomewasplasmaneuron-derived-exosomalTARDNA-bindingprotein43(TDP-43)orprostaglandinJ2.SecondaryoutcomesincludedchangeinALSFunctionalRatingScale-Revised(ALSFRS-R)scoreat6and18months,survival,andtime-to-compositeevents.Exploratorybiomarkersincludedneurofilamentlightchains,iron-regulatoryproteins,andcirculatingmicroRNAs.RESULTS:The68participantswerewellbalancedinageatentryandsex.InthePrimeCgroup,themean(SD)agewas59.1(9.1)years,and27of45participantsweremale.Intheplacebogroup,themean(SD)agewas55.0(13.0)years,and14of23participantsweremale.PrimeCwaswelltolerated,withasafetyprofilecomparabletoplacebo(adverseeventrate,66.7%PrimeCvs65.2%placebo).Drug-relatedadverseeventsweremorefrequentwithPrimeC(20.0%vs4.3%),mostlymildtomoderate,andtransient.Atmonth6,themeanALSFRS-Rdifferencewas2.23pointsbetweenPrimeCandplacebo(95%CI,-0.61to5.07;P=.12).Atmonth18,ALSFRS-RscoresinparticipantscontinuouslytreatedwithPrimeCmaintainedadifference(7.92points;95%CI,2.25to13.60;P=.007),withsignificantbulbardifference(3.18points;95%CI,1.32to5.04;P=.001).ContinuoustreatmentwasassociatedwithlowerriskofALScomplications,includinghospitalization,respiratoryfailure,ordeath(HR,0.36;95%CI,0.15-0.85;P=.02).Inthedouble-blindperiod,transferrinlevelswerepreservedwithPrimeC(1.90μmol/Ldifference;P=.03),thenegativeferritin-ALSFRS-Rcorrelationobservedinplacebo(ρ=-0.50;P=.02)wasabolished,andALS-associatedmicroRNAsweredownregulated(log2foldchange:miR-199a-3p,-1.87;falsediscoveryrate[FDR]P=.004;miR-199a-5p,-2.23;FDRP<.001;miR-181a-5p:-1.89;FDRP=.001;miR-181b-5p,-1.62;FDRP=.005).Prespecifiedneuron-derivedexosomeTDP-43/PgJ2analyseswillbereportedseparatelyfollowingcompletionofdevelopmentandanalyses.CONCLUSIONSANDRELEVANCE:PrimeCwassafeandwelltoleratedover18months.Althoughnotpoweredforefficacy,functionalandbiomarkerfindingssupportaconfirmatorytrial.TRIALREGISTRATION:ClinicalTrials.govIdentifier:NCT05357950.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中6个ADR关键词（advers,fatal,safety,adverse,tolerability）",
  },
  {
    drugName: "塞来昔布",
    pmid: "41773715",
    title:
      "TherapeuticeffectsofXianlinggubaocapsulesonkneefunction,inflammatoryresponse,andbonemetabolisminelderlypatientswithdegenerativekneeosteoarthritis.",
    abstract:
      "BACKGROUND:KOAisacommondegenerativejointdiseasethatoftencauseschronicpain,impairsdailyactivities,andimposesaconsiderableburdenonpatients.AIM:ThisresearchaimedtoevaluatetheclinicalefficacyandsafetyofXLGBcapsulesinimprovingkneejointfunctionandregulatingbonemetabolisminpatientswithdegenerativekneeosteoarthritis(KOA).SUBJECTANDMETHODS:Werandomised100elderlyKOApatientsintocontrol(receivedCelecoxibtreatment)andobservation(receivedCelecoxib+XLGBtreatment)groups,with50patientseach.Outcomemeasuresincludedinflammatorymarkers(IL-1,IL-6,TNF-α),bonemetabolismindicators(BGP,OPG,BALP,CTX-I),painmediators(5-HT,SP,PGE2),LysholmKneeScore,WOMACscore,VASscore,overallefficacy,andadversereactions.RESULTS:Aftertreatment,comparedtothecontrolgroup,theobservationgroupshowedlowerserumlevelsofIL-1,TNF-α,IL-6,CTX-I,5-HT,SP,andPGE2,lowerVASandWOMACscores,higherserumlevelsofBGP,OPG,BALP,higherLysholmscores,andhigheroveralleffectiverate(allp<0.05).Nostatisticallysignificantdifferenceintheincidenceofadversereactionsbetweenthetwogroupswasnotedduringtreatment(p>0.05).CONCLUSION:XLGBcapsulesareeffectiveandsafeformanagingdegenerativeKOA,offeringbenefitsinalleviatinginflammationandpain,improvingbonemetabolism,andenhancingkneejointfunction.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "塞来昔布",
    pmid: "41731820",
    title:
      "Genotype-guidedconservativemanagementofmesentericdesmoidtumors:Acasereportofintermediate-regionAPCmutations.",
    abstract:
      "RATIONALE:Desmoidtumors(DTs)exhibithighlyvariablebehavior,makingmanagementchallenging.Specificadenomatouspolyposiscoli(APC)genemutationsitesarerecognizedaskeyprognosticmarkers,potentiallyenablinggenotype-guidedstrategiestoavoidovertreatment.PATIENTCONCERNS:Wepresent2symptomaticpatientswithfamilialadenomatouspolyposis-associatedmesentericDTs.Patient1wasa46-year-oldfemalewithalarge,symptomaticpelvicmass.Patient2wasa26-year-oldmalewithmultifocalrecurrentdisease,includingasymptomaticabdominalwalllesion.DIAGNOSES:Diagnosiswasconfirmedbyimagingandhistopathology.Geneticsequencingidentifiedintermediate-regionAPCmutations:asomaticc.1821T>A(p.Cys607Ter)mutationinpatient1andac.3183_3187delACAAA(p.Gln1062Ter)mutationinpatient2.INTERVENTIONS:Managementwasstratifiedbygenotype.Giventheindolent-predictingmutations,patient1wasmanagedwithactivesurveillancealone.Forpatient2,thesymptomaticabdominalwalllesionwasresected,andlow-intensitysystemictherapy(tamoxifenandcelecoxib)wasinitiatedforresidualmesentericdisease.OUTCOMES:At5-yearfollow-up,patient1'stumorshowed>50%volumereductionwithsymptomalleviation.Patient2achievedsustaineddiseasestabilityinalllesionsat3-yearfollow-up,withpartialsymptomremission.Nosignificanttreatment-relatedadverseeventsoccurred.LESSONS:Intermediate-regionAPCmutations(e.g.,codons607and1062)predictanindolentcourseinmesentericDTs.ComprehensiveAPCgenotypingatdiagnosisenablesrisk-adaptedmanagement,permittingsafeuseofconservativestrategies(activesurveillance/low-intensitytherapy)andhelpsavoidunnecessaryaggressiveinterventions.ThisunderscoresthecriticalroleofmolecularprofilinginpersonalizingDTcare.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "塞来昔布",
    pmid: "41620908",
    title:
      "Celecoxibincombinationwithfootandankleorthosesforthetreatmentofacuteankleinjuries:Astudyonthecorrelationbetweenanti-inflammatoryandanalgesicmechanismsandfunctionalrecovery.",
    abstract:
      "BACKGROUND:Celecoxibcombinedwithanankleorthosisiswidelyusedinthetreatmentofacuteankleinjuries.However,detailsoflocaladversereactionssuchasskinlesionsandtendernessrelatedtotheorthosisareunclearandthesafetydifferencesamongdifferentinterventiongroupsarenotwellunderstood,affectingthechoiceoftreatmentregimen.OBJECTIVE:Thisstudyaimedtoexploretheanti-inflammatoryandanalgesicmechanismofcelecoxibcombinedwithanankleorthosisinthetreatmentofacuteankleinjuriesanditscorrelationwithfunctionalrecovery.METHOD:160patientswithmoderateacuteankleinjurieswererandomlydividedintofourgroups(n=40each):thecontrolgroupreceivedroutinetreatment,thecelecoxibgroupreceivedcelecoxibinaddition,theorthosisgroupreceivedanankleorthosisinadditionandthesynergistictreatmentgroupreceivedbothtreatments.Inflammatorymarkers(C-reactiveprotein(CRP),interleukin-6(IL-6),etc.),painmarkers(VisualAnalogueScale(VAS)score,etc.)andfunctionalmarkers(AmericanAcademyofFootandAnkleSurgery(AOFAS)score,etc.)werecomparedamongthefourgroups.Correlationandinfluencingfactorswereanalyzedandstratifiedanalysiswasperformedbasedonthesideofinjury.RESULTS:Thesynergistictreatmentgroupshowedbetterresultsthantheotherthreegroupsintermsofinflammation,painandfunctionalindicatorsatalltimepoints(p<0.05);thedegreeofinflammationandpainreliefwassignificantlypositivelycorrelatedwithfunctionalrecovery(r=0.71~0.83,p<0.001);celecoxibdosage,orthoticwearandthedegreeofIL-6reductionwereindependentinfluencingfactorsforfunctionalrecovery(p<0.05);patientswithleft-sidedinjuriesbenefitedmoresignificantlyfromsynergistictreatment(p<0.05).Therewasnodifferenceintheincidenceofadversereactionsamongthefourgroups(p>0.05).CONCLUSION:Thesynergistictreatmentenhancesefficacythroughanti-inflammatoryandbiomechanicalstabilizationeffects,withgoodsafetyprofileandpatientswithleft-sidedinjuriesbenefitmore.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41854177",
    title:
      "Pharmacokinetics,Safety,andTolerabilityofGS-1427,anOralProdrugofaPotentandSelectiveα4β7IntegrinInhibitor,inHealthyParticipants.",
    abstract:
      "GS-1427istheoralprodrugofGS-1069518,aninhibitoroftheα4β7integrin,andiscurrentlyindevelopmentforthetreatmentofulcerativecolitis(UC).Thisfirst-in-human,phase1,placebo-controlledstudyevaluatedthepharmacokinetics,safety,andtolerabilityofGS-1427andGS-1069518aftersingleoraldoses(20-1000mg)ormultipleonce-dailydoses(20-500mg)ofGS-1427for14days.Thebioavailabilityoftabletversuscapsuleformulationsandtheeffectoffoodandanacid-reducingagent(omeprazole)onexposurewerealsoassessed.Overall,148healthyparticipantswereenrolled,and143completedthestudy.GS-1427wasquicklyconvertedtoGS-1069518duringabsorption.Uponrepeatedonce-dailydosingofGS-1427undernonfastingconditions,steady-stateexposuretoGS-1069518wasreachedbyday5withlimitedaccumulationobserved.Atsteadystate,themediantimetomaximumconcentrationforGS-1069518was1-3handthemeanterminalhalf-lifewas6.7-28.3h.Bioavailabilitywaslowerinthetabletthanincapsuleformulation.FoodintakeandomeprazolecoadministrationreducedtheexposuretoGS-1069518byapproximately20%-40%.Overall,26/122participants(21.3%)whoreceivedGS-1427and8/26participants(30.1%)whoreceivedplaceboexperiencedatleastonetreatment-emergentadverseevent(AE).Ofthe148participants,10(6.8%)experiencedatreatment-relatedAE,themostcommonbeingnausea(5/148,3.4%)anddiarrhea(3/148,2.0%).AllAEsweregrade1inseverityandnoseriousAEsordeathswerereported.Thepharmacokinetics,safety,andtolerabilityresultsfromthisstudysupportfurtherevaluationofGS-1427inaphase2trialinpatientswithUC.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中5个ADR关键词（advers,safety,adverse,tolerability,death）",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41706381",
    title:
      "HepaticSafetyofAdjunctiveHigh-DoseMelatonininParticipantsReceivingOcrelizumabforPrimaryProgressiveMultipleSclerosis:LiverToxicityFindingsfromaPhaseI/IIRandomisedClinicalTrial(MELATOMS-1).",
    abstract:
      "BACKGROUNDANDOBJECTIVES:Basedonmelatonin'sneuroprotectiveeffectsinpre-clinicalmultiplesclerosismodels,theMELATOMS-1studywasdesignedtoevaluatemelatonintreatmentinpatientswithprimaryprogressivemultiplesclerosis(PP-MS)receivingocrelizumabtreatment.Thetrialwasprematurelyhaltedduetohypertransaminasemia.Thisstudyaimedtoanalyseobservedcasesofhypertransaminasemiaandexplorepotentialunderlyingmechanisms,focusingondrug-druginteractions.METHODS:ThisstudyreportsfindingsfromMELATOMS-1(NCT03540485),amulticentre,phaseI/II,randomised,double-blind,placebo-controlledtrialconductedinthemultiplesclerosisunitsofHospitalUniversitarioVirgenMacarena,HospitalUniversitarioVirgendelRocíoandHospitalVithasNisaofSeville.Thetrialwasdesignedtoevaluatethesafetyandefficacyofhigh-doseoralmelatonin(300mg/day)asanadjuncttherapyforpatientswithPP-MS(ExpandedDisabilityStatusScale2-7)onstableocrelizumabtherapy(>9months).Participantswereassigned1:1bystratifiedrandomisation(basedonMSseverityscore)toreceiveeitherdailyoralmelatoninoramatchingplacebo30minbeforebedtime.Safetywasevaluatedbymonitoringadverseeventsandscheduledbiochemicalanalyses,includingroutineliverfunctiontests[alanineaminotransferase(ALT),aspartateaminotransferase(AST),gamma-glutamyltransferase(GGT),alkalinephosphatase(ALP)andbilirubin,quantifiedbyautomatedimmunoassay],every3monthsforupto2years(thetrial'sendpoint).Thetrialwastemporarilystoppedaftergrade1-2hepatotoxicitywasidentifiedinthreepatients,accordingtothescaleoftheinternationalDILIexpertworkinggroup.Asubsequentposthoccausalityanalysisfocusedonpotentialdrug-drugpharmacokineticinteractionsbetweenhigh-dosemelatoninandthepatients'polypharmacyinvolvingcytochromeP450(CYP)enzymepathways.Theanalysisfocusedonconcomitantmedicationsincludingacetaminophen,metamizole,omeprazole,ibuprofen,acetylsalicylicacid,nabiximolandtizanidine.RESULTS:Thetrialwasprematurelystoppedandunblindedaftereightpatientshadbeenrecruited.Threeoutofthefourpatientsreceivingmelatonindevelopedhypertransaminasemia,whichresolvedaftertreatmentdiscontinuation.Allaffectedpatientswerewomentakingpolymedicationsmetabolizedthroughsharedhepaticpathwayswithmelatonin,suggestingapossibleinteractionleadingtohepaticoverload.Incontrast,theonlymaleparticipantinthearm,whodidnottakemedicationsthatsharedmetabolismwithmelatonin,experiencednoadverseliver-relatedeventsduringhis14-monthtreatmentperiod.CONCLUSIONS:Despitethefactthatmelatoninhasagoodsafetyprofile,thesefindingsraiseconcernsregardingthehepatotoxicpotentialofhighdosesofmelatonininpolymedicatedpatients.Thisisattributedtoaprobablepharmacokineticdrug-druginteractionwithconcomitantmedicationssharinglivermetabolizationpathwayswithmelatonin,leadingtoCYP450metabolicpathwayssaturation.Thoughthesefindingsshouldbeinterpretedwithcautionduetothesmallsamplesizeandheterogeneityofthestudypopulation,andfurtherstudiesareneededtoelucidatetheunderlyingmechanismsandestablishsafetyguidelines,thisstudyrevealsacriticalsafetyeventthatrequirescarefulconsiderationwhendesigningfutureclinicaltrialsinvolvinghigh-dosemelatonin,especiallyinpolymedicatedpopulations.CLINICALTRIALNUMBER:NCT03540485.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中8个ADR关键词（advers,safety,toxic,druginteraction,adverse）",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41645038",
    title:
      "EfficacyandSafetyofKeverprazan-AmoxicillinDualRegimeninInitialEradicationofHelicobacterpyloriInfection:AMulticenter,RandomizedControlledTrial.",
    abstract:
      "OBJECTIVES:Theefficacyofkeverprazan-amoxicillindualtherapy(KA)inthetreatmentofHelicobacterpylori(H.pylori)hasnotyetbeendemonstrated.Here,weaimedtocomparetheeradicationrateoftheKAregimenwithesomeprazole-basedbismuthquadrupletherapy(EBQT)containingamoxicillinandclarithromycinforH.pyloriinitialeradicationintheChinesepopulation.METHODS:Patientsagedbetween18-75yearswererandomlyassignedintoKAgrouportheEBQTgroup.TheKAgrouppatientsreceivedkeverprazan20mg(b.i.d.)andamoxicillin1.0g(t.i.d.)for14days.TheEBQTgrouppatientstookesomeprazole20mg(b.i.d.),amoxicillin1.0g(b.i.d.),clarithromycin0.5g(b.i.d.),andbismuthpotassiumcitrate220mg(b.i.d.)for14days.TheprimaryoutcomewastheH.pylorieradicationrate28daysaftertherapy.Secondaryoutcomesincludedcomplianceandadverseevents.RESULTS:Atotalof394patientswereenrolledinthisstudy.EradicationratesintheKAgroupandtheEBQTgroupwere87.88%and84.18%inintention-to-treatanalysis(ITT)(ratedifference:3.70%,95%CI:-3.14%to10.53%),92.55%and88.24%inmodifiedITTanalysis(ratedifference:4.32%,95%CI:-1.63%to10.27%),and93.99%and90.56%inper-protocolanalysis(PP)(ratedifference:3.43%,95%CI:-2.05%to8.92%),respectively.TheeradicationratesfortheKAgroupwerenotinferiortothoseoftheEBQTgroupinITT,modifiedITT,andPPanalysis.TheincidencesofnauseaandoveralladverseeffectsintheKAgroupweresignificantlylowerthanthoseoftheEBQTgroup.CONCLUSIONS:Keverprazan20mgtwicedailywithhigh-doseamoxicillindemonstratesanoninferiorefficacytobismuthquadrupletherapyforinitialH.pylorieradication.TRIALREGISTRATION:ChineseClinicalTrialRegistry,registrationNo:ChiCTR2400092511.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中4个ADR关键词（advers,adverse,infection,safety）",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41609334",
    title:
      "Acupunctureprovidesasafestrategytominimizeprotonpumpinhibitordoseinresistantgastroesophagealrefluxdisease:randomizedcontrolledtrial.",
    abstract:
      "Gastroesophagealrefluxdiseaserepresentsagrowingglobalburden,andasubsetofpatientsremainssymptomaticdespitestandard-doseprotonpumpinhibitortherapy.Thistrialaimedtocomparetheefficacyofacupuncturecombinedwithstandard-doseprotonpumpinhibitortherapyversushigh-doseprotonpumpinhibitortherapyinreducingsymptomsandimprovingqualityoflifefortreatment-resistantgastroesophagealrefluxdisease.Inthisparallel-grouprandomizedcontrolledtrial,72adultswithpersistentgastroesophagealrefluxsymptomsdespiteonce-dailyprotonpumpinhibitortherapywererandomizedtoreceiveeitheracupunctureplusstandard-doseomeprazoleordouble-doseomeprazolefor4weeks.TheprimaryoutcomewasachangeinrefluxsymptomsassessedwiththeGastroesophagealRefluxDiseaseQuestionnaire,andthesecondaryoutcomewasthequalityoflifemeasuredbytheShortForm-36questionnaire.Bothgroupsshowedsignificantimprovementinsymptomburdenandqualityoflife.Acupuncturewasassociatedwithagreaterreductioninheartburn(p=0.026)andanimprovementinqualityoflife(p<0.001),whilehigh-doseprotonpumpinhibitortherapydemonstratedmorefavorableeffectsonregurgitation(p=0.001)andsleepdisturbance(p<0.001).Aclinicallymeaningfulreductionintotalrefluxscorewasobservedinbothgroupswithoutsignificantbetween-groupdifferences.Adverseeventsweremildandtransient,withnoseriouscomplicationsreported.Acupuncturecombinedwithstandard-doseprotonpumpinhibitortherapyprovidesclinicalbenefitscomparabletohigh-doseprotonpumpinhibitortherapy,withfavorableeffectsonqualityoflifeandsymptomcontrol.Thesefindingssupportacupunctureasasafe,patient-centeredalternativeformanagingresistantgastroesophagealrefluxdisease.HIGHLIGHTSBothacupunctureplusstandard-dosePPIandhigh-dosePPIimprovesymptomsinresistantGERD.Acupunctureachievedgreaterimprovementsinhealth-relatedqualityoflife.High-dosePPIshowedstrongereffectsonregurgitationandsleepdisturbances.Noseriousadverseeventsoccurredwitheitherintervention.Acupunctureprovidesasafe,non-pharmacologicalternativeforresistantGERDcare.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41545331",
    title:
      "EffectsofGastricAcidSuppression,CytochromeP4503AInhibitionandInduction,andFoodonthePharmacokineticsofTinlarebantinHealthyAdults.",
    abstract:
      "Tinlarebantisanoralretinolbindingprotein4antagonistinclinicaldevelopmentforgeographicatrophy,anadvancedstageofdryage-relatedmaculardegeneration,andStargardtdisease,aninheritedjuvenile-onsetmaculardegeneration.Arandomized,open-label,two-period,interactionstudyinhealthyadultswasconductedinfourpartstodeterminetheeffectsofgastricacidsuppression(omeprazole40mgQD),cytochromeP4503A(CYP3A)inhibition(itraconazole200mgBD)andinduction(rifampin600mgQD),andfoodonthepharmacokineticsoftinlarebant(5mgsingledose).Theeffectsontinlarebantexposurewerequantifiedbygeometricleastsquares(GLS)meanCmaxandAUCinfratios,whereGLSmeanCmaxorAUCinfwithpotentialperpetratorisdividedbyGLSmeanCmaxorAUCinfwithoutpotentialperpetrator.Steady-statedosingofomeprazolehadnoeffectontinlarebantexposure(Cmaxratio=1.16andAUCinfratio=1.03).TheCmaxandAUCinfratiosoftinlarebantfollowingitraconazoledosingwere1.29and2.42,respectively.Rifampinco-administrationdecreasedtinlarebantCmaxandAUCinfratiosto0.53and0.19,respectively.Comparedwiththefastingstate,takingtinlarebantwithfoodgaveCmaxandAUCinfratiosintherange1.08-1.22.Nounexpectedsafetysignalsoccurredandtinlarebantwaswelltoleratedinallparticipants.Thesedatashowthatthepharmacokineticsoftinlarebantisnotsignificantlyalteredbygastricacidsuppressionorfood.DosingpatientswithtinlarebantandstrongCYP3Ainhibitorsisunlikelytocompromisesafetybasedonitspharmacokinetic-pharmacodynamicrelationships,buttinlarebantshouldbecontraindicatedwithstrongCYP3Ainducersduetopotentialtreatmentfailure.",
    hasAdverse: "疑似",
    confidence: "低",
    reason: "摘要中少量提及ADR关键词（safety），需人工确认",
  },
  {
    drugName: "奥美拉唑",
    pmid: "41520709",
    title:
      "BeneficialeffectsofacompoundprobioticinHelicobacterpylori-infectedpatientsagedover40years:Anopen-labelrandomisedclinicaltrial.",
    abstract:
      "BACKGROUND:Bismuthquadrupletherapy(BQT)isarecommendedfirst-lineregimenforHelicobacterpylori(H.pylori)eradication.,butitsuseislimitedbysideeffectsandrestrictedbismuthavailability.Probioticrepresentsaninvestigationalalternativestrategy.Thisstudycomparedtheefficacyandsafetyoftripletherapyplusprobiotics(TTP)withBQT.METHODS:PatientswithH.pyloriinfectionwererandomisedtoreceiveeitherTTP(probiotics,amoxicillin,clarithromycinandesomeprazole)orBQT(bismuthpotassiumcitrate,amoxicillin,clarithromycinandesomeprazole)for14d.Theprimaryendpointwastheeradicationrateby13C-ureabreathtest≥28daftertreatmentcompletion.Secondaryendpointsincludedadverseeventsandadherence.RESULTS:TheeradicationratesforTTPvs.BQTwere76.4%(126/165)and86.6%(142/164)intheintention-to-treat(ITT)analysis(difference,-10.2%;95%CI:-18.5%to-1.9%;P=0.521)and84.0%(126/150)and94.7%(142/150)intheprotocol(PP)analysis(difference,-10.7%;95%CI:-17.5%to-3.8%,P=0.576).Amongpatientsaged≥40y,eradicationrateswerecomparablebetweenTTPandBQTinboththeITTandPPanalysis(91.9%vs.84.9%and97.1%vs.93.8%,P=0.015andP=0.019fornoninferiority,respectively).TheincidenceofadverseeventwaslowerintheTTPgroup(17.8%vs.28.7%;P=0.029).Furthermore,TTPpreservedgutmicrobiotastability,whereasBQTinduceddysbiosis.CONCLUSION:WhileTTPwasinferiortoBQTineradicationefficacy,itdemonstratedbettertolerabilityandprotectiveeffectsagainstgutmicrobiotadysbiosis.Inpatientsaged≥40y,TTPachievednon-inferioreradicationrates,suggestingthissubgroupmaywarrantfurtherinvestigation.TRIALREGISTRATIONNUMBER:ChiCTR2200058491.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中6个ADR关键词（advers,sideeffect,safety,adverse,tolerability）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "41971936",
    title:
      "Asuccessfultreatmentofurticariapigmentosawithomalizumabinapediatricpatient:acasereport.",
    abstract:
      "BACKGROUND:Cutaneousmastocytosis(CM)isararedisordercharacterizedbyabnormalmastcellproliferationlimitedtotheskin.Conventionaltreatmentsincludingantihistaminesandcorticosteroidsoftenprovidesuboptimalsymptomcontrol,withlessthan50%ofpatientsrespondingadequatelytoH1-antihistaminetherapy.Omalizumab,ahumanizedmonoclonalantibodythatinhibitsimmunoglobulinE(IgE)bindingtomastcells,representsapromisingtherapeuticalternativeforrefractorycases.CASEDESCRIPTION:Wereporta14-year-oldMiddleEasternfemalewitha1-yearhistoryofintenselypruritic,hyperpigmentedmaculessignificantlyimpactingherqualityoflife.PhysicalexaminationrevealedwidespreadexcoriatederythematousandbrownmaculeswithpositiveDarier'ssign.HistopathologicalexaminationshowedCD117-positivemastcells,confirmingCMdiagnosis.LaboratoryinvestigationswerenormalexceptformildlyelevatedIgE(217IU/mL).Conventionalmanagementwithantihistamines,corticosteroids,andMontelukastprovidedminimalimprovement,withpersistenturticarialattacksrequiringsystemicsteroidpulses.Omalizumabwasinitiatedat150mgmonthlysubcutaneouslyandincreasedto300mgmonthlyduetorelapses.Followingdoseoptimization,thepatientachievedcompletesymptomresolutionandimprovedqualityoflifewithoutadverseevents.CONCLUSIONS:ThisrepresentsthefirstdocumentedpediatricCMcaseinSaudiArabiasuccessfullytreatedwithomalizumab.Thetreatmentdemonstratedremarkableefficacywhenconventionaltherapiesfailed,withexcellentsafetyprofile.OmalizumabmayserveasaviabletherapeuticalternativeforpediatricpatientswithrefractoryCM.Furtherclinicaltrialsareneededtoestablishoptimaltreatmentprotocols.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "41772161",
    title:
      "InhaledCorticosteroidsPlusTiotropiumComparedtoInhaledCorticosteroidsPlusMontelukastinChildrenwithPartlyControlled/UncontrolledAsthma:ANon-InferiorityTrial.",
    abstract:
      "OBJECTIVES:Tocomparetheefficacyandsafetyoforalmontelukastandinhaledtiotropiumasadd-ondrugstoinhaledcorticosteroids(ICS)inchildrenwithpartlycontrolled/uncontrolledasthma.METHODS:Thisopen-label,parallel-group,non-inferiority,randomizedcontrolledtrialwasconductedovertwo-yearperiodinthepediatricsdepartmentofatertiarycareteachinginstitute.Childrenaged6to14ywithpartlycontrolled/uncontrolledasthma,despitebeingonstep2or3oftreatmentasperGlobalInitiativeforAsthma(GINA)2021,wereenrolled.TheprimaryoutcomewasproportionofchildrenwithACT/c-ACTscore>19at3mo.ThesecondaryoutcomeswereproportionwithACT/c-ACTscore>19at6mo,changeinlungfunctionandqualityoflifescore,asthmaexacerbations,needforrescuetherapy,andsteroiduseduringthefollow-upat3and6mo.Alladverseeventswererecorded.RESULTS:Atotalof152participantswereenrolled.At3-mofollowup,47/73(64.4%)and33/66(50%)childreninthemontelukastandtiotropiumarmsrespectively,hadanAsthmaControlTest/ChildhoodAsthmaControlTest(ACT/c-ACT)score>19.Thedifferencewasnotstatisticallysignificantandthenon-inferioritycomparisonoftiotropiumtomontelukastwasinconclusive.Therewasnosignificantdifferenceinanyofthesecondaryoutcomesat3or6mo.Onechildinthemontelukastgroupdevelopedneuropsychiatricsymptoms.Noothersignificantadverseeventswerenoted.CONCLUSIONS:Non-inferiorityoftiotropiumtomontelukastat3mo,whenaddedtoICSinchildrenwithpartlycontrolled/uncontrolledasthma,withrespecttoasthmacontrol,wasnotproveninthistrial.Nosignificantdifferencewasnotedat6mo.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中4个ADR关键词（advers,adverse,neuropsychiatric,safety）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "41353847",
    title:
      "MontelukastasanoveltherapeuticapproachinmetastaticuvealmelanomaharboringaCYSLTR2mutation:atranslationalcasereport.",
    abstract:
      "BACKGROUND:Uvealmelanoma(UM),themostcommonprimaryintraocularmalignancyinadults,haslimitedsystemictreatmentoptionsinthemetastaticsetting.Recentinsightsintocysteinylleukotrienereceptors(CysLTRs)-particularlyCYSLTR2mutations(prevalence2%-4%)-suggestnewtherapeuticapproachesforpatientswhoprogressdespitestandardtherapies.CASE:Wereportthecaseofa59-year-oldmalewithmetastaticUMharboringaCYSLTR2mutation.Thepatientexperiencedprogressionaftermultiplesystemictreatments,includingimmunecheckpointinhibitors(ipilimumab/nivolumab,pembrolizumab),chemotherapy(dacarbazine,gemcitabine/treosulfan),andlocalradiotherapy.Lackinghumanleukocyteantigen-A*02:01,hewasineligiblefortebentafusp.InNovember2022,next-generationsequencingidentifiedaCYSLTR2mutation.Basedonmoleculartumorboardrecommendation,off-labeltreatmentwithmontelukast,aselectiveCysLT1receptorantagonist,wasinitiatedinMarch2024.Atthattime,thepatienthadwidespreadmetastases.Montelukastledtosustaineddiseasestabilizationfor>12months,withexcellenttolerabilityandnoreportedadverseevents.TheobservedeffectmaybeexplainedbyinhibitionofCYSLTR1andmodulationofCYSLTR2signalinginthemutatedreceptorcontext.CONCLUSION:ThisisthefirstpublishedcasesuggestingapotentialroleforleukotrienereceptorantagonistsinCYSLTR2-mutantUM.Thesefindingssupportfurtherpreclinicalandclinicalinvestigationofmontelukastasarepurposedtherapyinthischallengingdiseaseentity.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,tolerability）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "40844382",
    title: "CaseofAcuteEncephalopathyAssociatedWithMontelukast.",
    abstract:
      "INTRODUCTION:Montelukasthasbeenassociatedwithneuropsychiatricadverseeventsincludingmooddisorders,suicidality,andanxietydisorders.Studieshaveshownapossibleassociationbetweenmontelukastanddelirium;however,mostofthisresearchhasbeenfocusedonchildrenandadolescents.CASEREPORT:A59-year-oldfemalewasadmittedformanagementofspinalosteomyelitis,psoasabscess,epiduralabscess,andbacteremia.Onhospitalday19,shehadnewonsetofencephalopathy,andworkuprevealednoclearetiology.Onhospitalday41,herhomedoseofmontelukastwasstopped,andhermentationimprovedoverthenextseveraldays.Thisimprovementincognitionwassustainedeventhoughothermedicalfactorscontinuedtofluctuate.DISCUSSION:Thereweremanyfactorsthatmayhavecontributedtothispatient'sencephalopathy,butthetemporalrelationshipbetweencessationofmontelukastandimprovementinhermentationsuggestsanassociationbetweenthismedicationandhersymptoms.CONCLUSION:Wepresentahospitalizedpatientwithacuteencephalopathy,whichresolvedafterdiscontinuingmontelukast.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中4个ADR关键词（advers,adverse,suicidal,neuropsychiatric）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "40419876",
    title:
      "Aclinicalstudyonthecombinationofbencycloquidiumbromideandmontelukastinthetreatmentofmoderatetosevereallergicrhinitis.",
    abstract:
      "BACKGROUND:Bencycloquidiumbromide(BCQB)isanovelsynthesizedquaternaryammoniumsaltcompoundbasedontheclassicanticholinergicdrugipratropiumbromide.ThisstudywastocomparetheefficacyofBCQBandmontelukast(MNT)combinationtherapytothatofMNTmonotherapyinthetreatmentofmoderatetosevereallergicrhinitis((M/S)AR).METHODS:Thisstudyenrolledenrolled300patientswith(M/S)AR.TheparticipantswererandomizedtoreceiveBCQB(180μgeachtime,qid)plusMNT(10mgqn)(BCQB+MNTgroup)orMNTalone(10mgqn)for4weeks.Thevisualanalogscale(VAS)forrhinorrhea,sneezing,nasalcongestion,itching,andtherhinoconjunctivitisqualityoflifequestionnaire(RQLQ)wereassessedbeforeandattheendoftreatments.Adverseeventswererecordedindetail.RESULTS:FASanalysiswasperformedonatotalof133and134patients,intheBCQB+MNTgroupandinMNTgroup,respectively.Thebaselineinformationwascomparable.BothtreatmentssignificantlyreducedthescoreoftotalVASand4mainVASsymptomscomparedtobaseline.However,theBCQB+MNTgroupexhibitedsignificantlygreaterdecreaseinscoresforrhinorrheaandnasalcongestioncomparedtoMNTalone.After2weeksoftreatment,theBCQB+MNTgroupshowedsignificantlylargerdecreaseintheRQLQscoreintermsofdailyliving,nonnasalandocularsymptoms,behavioralproblems,nasalsymptoms,andocularsymptomscomparedtoMNTalone.Attheendofthetrial,bothtreatmentssignificantlyreducedthetotalRQLQscorefrombaseline;however,theBCQB+MNTgroupshowedsignificantdecreaseinscorescomparedtoMNTalone.Mildandtransientadverseeventswererecorded,whichweresimilarbetweenthe2groups.CONCLUSION:ThecombinationofBCQBandMNThadagreateroveralleffect,comparedtoMNTmonotherapyinimprovingnasalsymptomssuchasnasalcongestionandrhinorrhea,aswellasqualityoflifeinthetreatmentof(M/S)AR.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,allergic）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "40319910",
    title:
      "Pre-emptiveMontelukastandItsEffectonClinicalOutcomesAfterMandibularThirdMolarSurgery:ATriple-blindedRandomizedControlledTrial.",
    abstract:
      "BACKGROUND:Cyclooxygenaseinhibitorsarewell-studiedforpainandswellingcontrolaftermandibularthirdmolarextraction,whilethelipoxygenasepathwayandleukotrienereceptorantagonists,likemontelukast,remainlessresearched.PURPOSE:Thepurposeofthestudywastomeasureandcomparepostoperativepainrelieffromsinglepre-emptivedosesofmontelukastandetoricoxib.STUDYDESIGN:Theinvestigatorsconductedatriple-blinded,placebo-controlledrandomizedclinicaltrialandenrolledasampleofpatientswhopresentedtotheAllIndiaInstituteofMedicalSciences,Mangalagiri,betweenJanuary2023andApril2023forevaluationandmanagementofimpactedlowerthirdmolars.Patientswithactiveinflammationorinfectioninthethirdmolarregionwereexcludedfromthestudy.PREDICTORVARIABLE:Thepredictorvariablewaspre-emptiveanalgesicregimen:montelukast,etoricoxib,oraplacebo,andsubjectswererandomlyassignedto3groups.OUTCOMEVARIABLE(S):Theprimaryoutcomevariablewastheintensityofpostoperativepain,measuredusingan11-pointvisualanalogscaleat0,2,4,6,8,10,12,24,48,72hours,and7dayspostsurgery.Secondaryoutcomevariablesincludedchangesintissuetumornecrosisfactor-alphalevels,theneedforrescueanalgesia,edema,andtrismus.COVARIATES:Thestudycovariatesincludeddemographicandsurgicalcharacteristics.ANALYSES:Bivariateanalyseswereconductedusingtheχ2testorone-wayANOVA,whileunivariateanalysisutilizedrepeated-measuresANOVAtoassessoutcomechangesovertime,followedbypost-hoccomparisonsforgroupdifferences.StatisticalsignificancewassetatP<.05.RESULTS:Forty-eightparticipantswererandomizedinto3equalgroupsof16,withnostatisticallysignificantdifferencesinclinicoradiographicorsurgicalcharacteristics(P>.2).At2hourspostoperatively,themeanpainscorewassignificantlylowerintheetoricoxibgroup(2.19±2.0)comparedtothemontelukastandplacebogroups(3.06±1.6and4.13±1.9,respectively)(P=.01;95%CI:-3.60to-0.27).Repeated-measuresANOVArevealedastatisticallysignificantinteractionbetweentimeandtreatmentgroup(P=.008).Posthocanalysisshowedsignificantlylowerpainintensityat2hoursintheetoricoxibgroupcomparedtotheplacebogroup(P=.01;95%CI:-3.60to-0.27).CONCLUSION:Inthirdmolarsurgery,pre-emptiveetoricoxibreducedpostoperativepain,whilemontelukastdecreasedinflammationandmodulatedtumornecrosisfactor-alphalevels.Theresultsofthestudydonotsupporttheuseofthealternativepre-emptiveanalgesicregimens.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（edema,infection）",
  },
  {
    drugName: "孟鲁司特",
    pmid: "40205376",
    title:
      "ComparisonofICSdosereductionvs.montelukastdiscontinuationforstep-downtherapyinwell-controlledasthma:apilotrandomizedcontrolledtrial.",
    abstract:
      "BACKGROUND:Whileasthmaguidelinesadvocateforreducinginhaledcorticosteroid(ICS)dosesinwell-controlledpatients,limitedevidenceexiststodirectlysupportthisapproach.ThisstudyaimedtocomparetheeffectivenessofICSdosereductionversusmontelukastdiscontinuationasstep-downstrategiesinadultswithwell-controlledasthma.METHODS:Thissingle-center,pilotrandomizedcontrolledtrialenrolled73adultswithwell-controlledasthma.ParticipantswererandomizedtoeitherGroupA:ICSDoseReduction(n=37)orGroupB:MontelukastDiscontinuation(n=36).Bothgroupsreceivedstandardcareandtheirdesignatedinterventionforthreemonths.TheprimaryoutcomewasasthmacontrolmeasuredbytheACTscore.Secondaryoutcomesincludedlungfunction,asthmaexacerbationfrequency,treatmentfailurerates,andcoughsymptoms.Medicationadherencewasassessedusingdosecountersandpillcounts.RESULTS:Therewasnosignificantdifferenceinoverallasthmacontrolbetweenthegroups,asmeasuredbytheACTscore(p=0.42).However,patientsinGroupA(reducedICS)experiencedsignificantlyfewertreatmentfailurescomparedtoGroupB(discontinuedmontelukast)atthreemonths(p=0.01).Noseriousadverseeventswerereported.CONCLUSION:AlthoughtheACTscoresdidnotsignificantlydifferbetweenthegroups,wedidobserveatrendtowardsfewertreatmentfailuresintheICSreductiongroup.ThissuggeststhatreducingICSdosesmayhelptomaintainasthmacontrolandreducetheriskofexacerbations.However,furtherresearchiswarrantedtoconfirmthesefindingsinlarger,long-termstudies.TRIALREGISTRATION:IRCTRegistrationNumberIRCT2016052428037N1,Retrospectivelyregistered,RegistrationDate20,160,701.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42146930",
    title:
      "Erectorspinaeplaneblockforopioidsparinginchildrenundergoinglaparoscopicappendectomy:arandomizedcontrolledtrial.",
    abstract:
      "BACKGROUND:Despitebeingaminimallyinvasiveprocedure,laparoscopicappendectomy(LA)frequentlyinducessubstantialpostoperativepaininchildren.Whileerectorspinaeplaneblock(ESPB)hasdemonstratedefficacyforpostoperativeanalgesiainpediatricopenabdominalsurgery,itsanalgesicbenefitsandsafetyprofileinlaparoscopicproceduresremainunestablished.PURPOSE:Toevaluatetheopioid-sparingeffects,analgesicefficacy,andsafetyofESPBinchildrenundergoingLA.DESIGN:Asingle-center,double-blind,randomized,superioritytrial.METHODS:Childrenaged6-12yearswithAmericanSocietyofAnesthesiologists(ASA)physicalstatusI-IIscheduledforLAatAnhuiProvincialChildren'sHospitalwereenrolled.Participantswererandomlyallocated1:1usingacomputer-generatedsequencetoreceiveeitherbilateralultrasound-guidedESPBatT8(0.25%ropivacaine,0.5mL/kgperside)aftertrachealintubation(ESPBgroup)ornoblock(Controlgroup).Bothgroupsreceivedstandardizedmultimodalanalgesiacomprisinghydromorphone-basedpatient-controlledintravenousanalgesia(PCIA)andscheduledacetaminophen.Theprimaryoutcomewas0-24hcumulativehydromorphoneconsumption;secondaryoutcomesincludedpainscores,PCIAparameters,rescueanalgesiarequirements,recoverymilestones,parentalsatisfaction,andadverseevents.RESULTS:Ofthe80childrenrandomized(40pergroup),75completedfollow-upandwereanalyzed(ESPB,n=37;control,n=38).TheESPBgroupexhibitedsignificantlylower24hhydromorphoneconsumption(32.8±10.1vs.72.9±14.5μg/kg;meandifference:-40.1μg/kg;P<0.001),representinga55%reductioncomparedwiththeControlgroup.SecondaryoutcomesfavoringESPBincludedlowerpainscoresduringtheearlypostoperativeperiod(PACUto6h;P<0.05),prolongedtimetofirstPCIAdemand(201.0vs.58.5min;P<0.001),fewertotalPCIApresses(10vs.17;P<0.001)andeffectivepresses(9vs.17;P<0.001)within0-24h,reducedrescueanalgesiarequirements(2.7%vs.21.1%;P=0.028),andhigherparentalsatisfactionscores(8vs.7points;P=0.001).Noseriousblock-relatedcomplicationsoccurred.CONCLUSIONS:InchildrenundergoingLA,asingle-injectionbilateralultrasound-guidedESPBatT8providessignificantopioid-sparingeffectsandalleviatesacutepostoperativepainduringthefirst24hwithoutincreasingadverseeventrates,supportingitsincorporationasacomponentofmultimodalanalgesiaforpostoperativepainmanagementinthispopulation.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,safety）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42112227",
    title:
      "ClinicallySuspectedAcutePost-MeaslesEncephalitisComplicatedbyParacetamol-InducedHepatotoxicityinanUnvaccinatedChild:ACaseReportfromaResource-LimitedSetting.",
    abstract:
      "INTRODUCTION:Measlesremainsamajorcauseofchildhoodmorbidityandmortalityinsettingswithlowvaccinationcoverage.Althoughmostcasesareself-limited,severeneurologicalcomplicationscanoccur,includingpost-measlesencephalitis,whichmaybelife-threateninganddiagnosticallychallenginginresource-limitedsettings.CASEPRESENTATION:Wereportanunvaccinatedyoungchildwhodevelopedaclinicalsyndromemostconsistentwithacutepost-measlesencephalitisafteratypicalmeaslesillnesscharacterizedbyfever,maculopapularrash,conjunctivitis,cough,andhouseholdexposure.Thechildlaterpresentedwithseizuresandalteredconsciousness.Laboratoryevaluationshowedanemia,elevatedinflammatorymarkers,andmarkedlyelevatedliverenzymesinthesettingofsupratherapeuticparacetamolexposure.Becausecerebrospinalfluidanalysisandmagneticresonanceimagingwerenotavailable,thediagnosiswasmadeclinicallybasedonthehistory,timingofneurologicaldeterioration,andexclusionofmajorstructuralintracranialpathologyonbraincomputedtomography.Thepatientwastreatedwithsupportiveintensivecare,empiricalantimicrobialandantiviraltherapy,vitaminA,intracranialpressuremanagement,andintravenousN-acetylcysteine,withcompleteneurologicalrecovery.CONCLUSION:Acutepost-measlesencephalitisshouldbeconsideredinunvaccinatedchildrenwhodevelopnewneurologicalsymptomsafterrecentmeaslesillness.Thiscasehighlightstheimportanceofearlyclinicalrecognition,routinemeaslesimmunization,andsafefevermanagement,includingcarefulweight-basedparacetamoldosingandcaregivercounselinginresource-limitedsettings.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中5个ADR关键词（mortality,toxic,toxicity,hepatotoxic,hepatotoxicity）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42065397",
    title:
      "IntravenousAcetaminophenforShoulder-TipPainDuringAwakeLaparoscopicSurgeryinEarlyPregnancy:ACaseReport.",
    abstract:
      "A27-year-oldprimigravidaat9weeks'gestationunderwentemergencylaparoscopicovariansurgeryundercombinedspinal-epiduralanesthesia.Duringpneumoperitoneum,bilateralshoulder-tippaindevelopedafterTrendelenburgpositioning.Intravenousacetaminophen(1000mg)wasinitiated,andpainimprovedwithin10minutes,allowingsurgerytocontinuewithoutloweringinsufflationpressure,administeringadditionalopioidsorsedatives,orconvertingtogeneralanesthesia.Painresolvedafterdesufflation.Maternaloxygenationremainedstable,andfetalcardiacactivitywasreassuringbeforeandaftersurgery.Thiscasesuggeststhatintravenousacetaminophenmaybeanopioid-sparingrescueoptionforintraoperativeshoulder-tippainduringawakelaparoscopyinearlypregnancy.",
    hasAdverse: "否",
    confidence: "低",
    reason: "未检测到明显的不良反应关键词",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42036187",
    title:
      "Propacetamolincombinationwithintravenouspatient-controlledanalgesiaforpostcesareansectionuterinecontractionpain:Arandomizedcontrolledtrial.",
    abstract:
      "OBJECTIVES:Propacetamol,anintravenousprodrugofparacetamol,canbeemployedalongsideintravenouspatient-controlledanalgesia(IVPCA)todecreaseopioidconsumptionandassociatedsideeffects.Whilepriorstudiesfocusedonpropacetamol'sefficacyinincisionalwoundpain,itseffectivenessforuterinecontractionpainremainsunderexplored.MATERIALSANDMETHODS:ThisprospectiverandomizedcontrolledtrialrecruitparturientswithASAphysicalstatusclassII,undergoingscheduledcesareandeliveryatgestationalage36weeksorgreater.Allparturientsreceivedspinalanesthesiaandwererandomlyallocatedtothreegroups:0g,1gand2gofpropacetamolrespectivelyincombinationwithmorphinebasedIVPCA.Theprimaryoutcomewasthepostoperativevisceraluterinecontractionpainandwoundincisionalpaincomparedto0ggroup.Thesecondaryoutcomescomprisedmorphineconsumption,patientsatisfaction,andtreatment-relatedadverseevents.Hierarchicallinearmodelingandone-wayANOVAwereusedforstatisticalanalysis.RESULTS:Atotalof97parturientswereenrolled.Boththe1gand2gpropacetamolgroupsshowedsignificantreductionsinincisionalwoundpaincomparedwiththe0ggroup(p=0.001andp<0.001,respectively);however,onlythe2gofpropacetamolsignificantlyreduceduterinecontractionpain(p=0.002).Morphineconsumptionwaslesserin2gpropacetamolgroup(p<0.001).Patientsatisfactionandtreatment-relatedadverseeventsdidnotdifferamonggroups.CONCLUSION:Whencombinedwithmorphine-basedpatient-controlledanalgesia,regularadministrationof2gpropacetamolreducesuterinecontractionpainandmorphineconsumptionaftercesareandelivery,whereasboth1gand2greduceincisionalwoundpain.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,sideeffect）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42013574",
    title:
      "CerebraledemaandbraindeathfollowingintravenousN-acetylcysteineoverdose:acasereport.",
    abstract:
      "N-acetylcysteine(NAC)infusionsarerarelyassociatedwithcerebraledema.Wepresentapatientthatreceived1242.2mg/kgintravenousNACover8.3hwhodevelopedseizures,cerebraledema,anddied.A17-24-year-oldfemale(48.3kg)presentedafteranacuteacetaminopheningestion.Theirinitialpresumed5hacetaminophenconcentrationwas591.7μmol/L.Initialalanineaminotransferase(ALT)andaspartateaminotransferase(AST)were16and21IU/L,respectively.Duetoinconsistenciesinthetimeofingestion,IVNACwasinitiatedasatwo-stepprotocolof150mg/kgover1hfollowedby15mg/kg/hfor20h.Duringtreatment,thepatientdevelopedvomiting,flushing,andamaculopapularrash.ItwasdiscoveredthatNAChadbeenadministeredcontinuouslyat150mg/kg/hfor8.3handwasstopped.Thepatientbecameconfusedandagitatedandsubsequentlydevelopedseizures.Theyweretreatedwithlorazepam,phenytoin,intubation,andpropofol.Neuroimagingdemonstratedcerebraledemawithcerebellartonsillarherniation.Despiteneurocriticalcare,thepatientdied86hpost-ingestion.Thepatient'sALTandASTremainednormal.Investigationsincludinglumbarpunctureandpost-mortemtoxicologyanalysiswereunremarkable.CliniciansmustbeawareoftheclinicalfeaturesofsupratherapeuticIVNACdosingerrorsandpotentialadverseeffects.",
    hasAdverse: "是",
    confidence: "高",
    reason:
      "摘要/标题中命中6个ADR关键词（advers,toxic,overdose,adverse,edema）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "42013367",
    title:
      "Ararecaseofgeneralizedbullousfixeddrugeruptionresemblingtoxicepidermalnecrolysis.",
    abstract:
      "Generalizedbullousfixeddrugeruption(GBFDE)isarareandsevereadversedrugreactioncharacterizedbywidespreadblistersanderosionsinvolvingatleast10%ofthebodysurface.GBFDEcanmimicStevens-Johnsonsyndrome(SJS)andtoxicepidermalnecrolysis(TEN),bothclinicallyandhistologically.Wepresentthecaseofa76-year-oldwomanwithextensivepainfulblistersanderosionsaffectingapproximately70%ofherskin,includingtheoralandgenitalmucosa,accompaniedbyanimpairedgeneralcondition,stronglysuggestingTEN.However,theabsenceofNikolsky'ssign,togetherwithslate-grayhyperpigmentation,pointedtowardGBFDE,latersupportedbyhistopathologicalanalysis.Paracetamolwasidentifiedasthemostlikelycausativeagent.Followingdiscontinuationoftheculpritdrug,thepatientwastreatedwithhigh-dosecorticosteroidsandantibioticswithinamultidisciplinarycareapproach.After3weeksofhospitalization,theskinlesionshealedwithresidualhyperpigmentation,andherconditionstabilized.Ourcasehighlightsthechallengeofdifferentiatingbetweentwouncommonseveredisorderswithoverlappingclinicalandhistopathologicalfeatures,includingextensiveepidermalnecrosisandsubepidermalblistering.ClinicalandpathologicalcorrelationbyexperiencedphysiciansisessentialfordistinguishingGBFDEfromTENbecausetheirmanagementstrategiesdiffer,impactingbothpatientoutcomesandhealthcarecosts.",
    hasAdverse: "是",
    confidence: "高",
    reason: "摘要/标题中命中3个ADR关键词（advers,adverse,toxic）",
  },
  {
    drugName: "对乙酰氨基酚",
    pmid: "41980267",
    title:
      "TheAssociationofPreoperativeCognitiveDysfunctiontoCommonIntraoperativeElectroencephalographicParametersandCerebralHypoxiaDuringCardiacSurgery.",
    abstract:
      "BACKGROUND:Oldercardiacsurgerypatientshaveahigherprevalenceofcognitivedysfunctionandelevatedriskofperioperativeneurocognitivedisorders(PND),bothindependentlyrelatedtoadversepostoperativeoutcomes.Neuromonitoringusingelectroencephalogram(EEG)andcerebraloximetry(CO)maypredictPND.However,preoperativefactorsinfluencingintraoperativeneurophysiologicalcharacteristicsarenotwellunderstood.Weconductedastudyinacardiacsurgerycohorttobetterunderstandtherelationshipofpreoperativecognitivedysfunctiontointraoperativeburstsuppression(BS),spectraledgefrequency(SEF),cerebralhypoxia/desaturation,anddualcerebraleventsinvolvingbothBSandcerebraldesaturationtopotentiallylinkpreoperativecognitivedysfunctiontointraoperativeneuromonitoringvariablesassociatedwithPND.METHODS:Thisisasecondaryanalysisofatriple-blinded,ongoing,multi-centerrandomizedtrialassessingtheefficacyofpostoperativeintravenousacetaminophentoreducepostoperativedelirium(POD)inoldercardiacsurgerypatients.Westudied110patients≥60yearswhounderwentCABGand/orvalvesurgeryundergeneral(inhalational)anesthesiaatasingleacademiccenter.PreoperativecognitivestatuswasassessedusingtheMontrealCognitiveAssessment(MoCA)andclassifiedasnormal(MoCAscore≥26)orimpaired(MoCA<26).IntraoperativefrontalelectroencephalogramdatawererecordedusingtheEEGmonitor(SedLine,MasimoInc).BSwasdetectedusingarecursivevarianceestimationalgorithm,quantifyingburstsuppressionduration(BSD).SEFswerederivedthroughmulti-taperspectralanalysis.Intraoperativecerebraloxygenationwasmeasuredviacerebraloximetry(O3,Masimo),identifyingcerebraldesaturations(COvalues<60%).UnivariateanalysesassessedassociationsbetweenpreoperativecognitivedysfunctionandBSD,SEF,cerebraldesaturation,anddualcerebraleventsofBSandcerebraldesaturation.Multivariableregressionanalysesforthesevariablescontrolledfordemographicsandintraoperativeconfounders.RESULTS:Baselinecharacteristicswerecomparablebetweenthegroups.TherewasnostatisticallysignificantcorrelationbetweenpreoperativecognitionandBSDincognitivelyimpairedindividuals(Cohen'sd=0.33;P=.09;remaininginsignificantonadjustment,P=.8).AdjustedanalysesshowedthosewithabnormalMoCAscoreshadanaverageof1.4HzlowerSEFvalues(95%confidenceinterval[CI],0.07-2.6;P=.03).Cognitivelyimpairedpatientsdemonstratednosignificantincreaseintimespentincerebraldesaturations(55.4[12.4-119]vs46.3[19.2-81.9]minutes;P=.6).NodisparitieswereobservedbetweenthegroupsregardingconcurrentandnonconcurrentabnormalEEGandCOvalues.CONCLUSIONS:PreoperativecognitivedysfunctionwasassociatedwithsignificantlylowerSEFs,indicatingincreasedisofluranesensitivitywithoutaffectingBSorcorrelatingwithCO.SEFshowspotentialasamarkerforcognitivevulnerabilities,butfurtherstudiesareneededtovalidateitsclinicalutilityandestablishthresholdstooptimizeperioperativecare.",
    hasAdverse: "是",
    confidence: "中",
    reason: "摘要命中2个ADR关键词（advers,adverse）",
  },
];

export interface SupervisionCodeStep {
  label: string;
  title: string;
  desc: string;
  logs: string[];
  content: () => string;
}

export const supervisionCodeSteps: SupervisionCodeStep[] = [
  {
    label: "下载数据",
    title: "步骤一：下载监管码并导出TMS订单",
    desc: "下载监管码数据并导出TMS订单信息。",
    logs: [
      "RPA机器人启动",
      "监管码数据下载成功，共2,346条",
      "TMS订单信息导出成功",
    ],
    content: function () {
      var codeRows = [
        { code: "12345678901234567890", source: "码上放心", status: "ok" },
        { code: "23456789012345678901", source: "码上放心", status: "ok" },
        { code: "34567890123456789012", source: "码上放心", status: "ok" },
        { code: "45678901234567890123", source: "码上放心", status: "warn" },
        { code: "56789012345678901234", source: "码上放心", status: "ok" },
      ];
      var orderRows = [
        {
          orderId: "YP20250607001",
          name: "阿莫西林胶囊",
          batch: "BH2025A001",
          code: "12345678901234567890",
          qty: 100,
        },
        {
          orderId: "YP20250607002",
          name: "布洛芬片",
          batch: "BH2025B002",
          code: "23456789012345678901",
          qty: 200,
        },
        {
          orderId: "YP20250607003",
          name: "二甲双胍片",
          batch: "BH2025C003",
          code: "34567890123456789012",
          qty: 150,
        },
        {
          orderId: "YP20250607004",
          name: "氯化钠注射液",
          batch: "BH2025D004",
          code: "",
          qty: 500,
        },
        {
          orderId: "YP20250607005",
          name: "维生素C片",
          batch: "BH2025E005",
          code: "56789012345678901234",
          qty: 300,
        },
      ];
      var html =
        '<div style="font-size:12px;font-weight:500;color:var(--color-text-primary);margin-bottom:0.5rem">📥 监管码数据</div>' +
        '<table class="data-table anim-row"><thead><tr>' +
        "<th>监管码</th><th>数据来源</th><th>状态</th>" +
        "</tr></thead><tbody>";
      codeRows.forEach(function (r) {
        var badge =
          r.status === "ok"
            ? '<span class="badge b-ok">✓ 正常</span>'
            : '<span class="badge b-warn">⚠ 待核查</span>';
        html +=
          '<tr><td style="font-family:monospace;font-size:10px">' +
          r.code +
          "</td><td>" +
          r.source +
          "</td><td>" +
          badge +
          "</td></tr>";
      });
      html +=
        '<tr><td colspan="3" style="text-align:center;color:var(--color-text-secondary);font-size:11px">… 显示前5条</td></tr>';
      html += "</tbody></table>";
      html +=
        '<div style="font-size:12px;font-weight:500;color:var(--color-text-primary);margin-bottom:0.5rem;margin-top:1rem">📋 TMS订单信息</div>' +
        '<table class="data-table anim-row"><thead><tr>' +
        "<th>订单号</th><th>商品名称</th><th>批号</th><th>监管码</th><th>发货数量</th>" +
        "</tr></thead><tbody>";
      orderRows.forEach(function (r) {
        html +=
          "<tr><td>" +
          r.orderId +
          "</td><td>" +
          r.name +
          "</td><td>" +
          r.batch +
          "</td>" +
          '<td style="font-family:monospace;font-size:10px">' +
          (r.code || '<span style="color:#9CA3AF">缺失</span>') +
          "</td>" +
          "<td>" +
          r.qty +
          "</td></tr>";
      });
      html +=
        '<tr><td colspan="5" style="text-align:center;color:var(--color-text-secondary);font-size:11px">… 显示前5条</td></tr>';
      html += "</tbody></table>";
      return html;
    },
  },
  {
    label: "清洗监管码",
    title: "步骤二：清洗监管码",
    desc: "去重并校验格式，只保留20位字母数字的监管码。",
    logs: [
      "开始清洗监管码数据",
      "去重处理 - 移除重复码 89条",
      "格式校验 - 过滤无效码 47条",
      "清洗完成，有效监管码：2,210条",
    ],
    content: function () {
      return (
        '<div style="font-size:12px;font-weight:500;color:var(--color-text-primary);margin-bottom:0.5rem">🧹 清洗结果统计</div>' +
        '<table class="data-table anim-row"><thead><tr>' +
        "<th>清洗前</th><th>清洗后</th><th>处理说明</th>" +
        "</tr></thead><tbody>" +
        '<tr><td style="font-family:monospace;font-size:11px">2,346条</td><td style="font-family:monospace;font-size:11px">2,210条</td><td><span class="badge b-ok">✓ 有效</span></td></tr>' +
        '<tr><td style="font-family:monospace;font-size:11px">重复 89条</td><td style="font-family:monospace;font-size:11px">-</td><td><span class="badge b-warn">已去重</span></td></tr>' +
        '<tr><td style="font-family:monospace;font-size:11px">无效格式 47条</td><td style="font-family:monospace;font-size:11px">-</td><td><span class="badge b-err">已过滤</span></td></tr>' +
        "</tbody></table>"
      );
    },
  },
  {
    label: "对比分析",
    title: "步骤三：对比查找异常",
    desc: "对比监管码与订单信息，查找缺失和多余的监管码。",
    logs: [
      "开始对比监管码与订单信息",
      "发现缺失监管码：36条",
      "发现多余监管码：28条",
      "对比分析完成",
    ],
    content: function () {
      return (
        '<div class="compare-grid anim-row">' +
        '<div class="compare-side">' +
        '<div class="compare-side-title">⚠ 缺失监管码 (36条)</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px">' +
        '<div style="background:#FCEBEB;border-radius:6px;padding:8px 10px;border-left:3px solid #E24B4A">' +
        '<div style="font-size:12px;font-weight:500;color:#A32D2D">YP20250607004</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">氯化钠注射液 · BH2025D004</div>' +
        "</div>" +
        '<div style="background:#FCEBEB;border-radius:6px;padding:8px 10px;border-left:3px solid #E24B4A">' +
        '<div style="font-size:12px;font-weight:500;color:#A32D2D">YP20250607012</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">葡萄糖注射液 · BH2025F012</div>' +
        "</div>" +
        '<div style="background:#FCEBEB;border-radius:6px;padding:8px 10px;border-left:3px solid #E24B4A">' +
        '<div style="font-size:12px;font-weight:500;color:#A32D2D">YP20250607028</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">头孢克肟胶囊 · BH2025G028</div>' +
        "</div>" +
        '<div style="text-align:center;color:#9CA3AF;font-size:11px;padding-top:4px">… 显示前3条</div>' +
        "</div>" +
        "</div>" +
        '<div class="compare-side">' +
        '<div class="compare-side-title">✗ 多余监管码 (28条)</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px">' +
        '<div style="background:#FAEEDA;border-radius:6px;padding:8px 10px;border-left:3px solid #EF9F27">' +
        '<div style="font-size:12px;font-weight:500;color:#854F0B">45678901234567890123</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">未找到对应订单</div>' +
        "</div>" +
        '<div style="background:#FAEEDA;border-radius:6px;padding:8px 10px;border-left:3px solid #EF9F27">' +
        '<div style="font-size:12px;font-weight:500;color:#854F0B">67890123456789012345</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">未找到对应订单</div>' +
        "</div>" +
        '<div style="background:#FAEEDA;border-radius:6px;padding:8px 10px;border-left:3px solid #EF9F27">' +
        '<div style="font-size:12px;font-weight:500;color:#854F0B">89012345678901234567</div>' +
        '<div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">未找到对应订单</div>' +
        "</div>" +
        '<div style="text-align:center;color:#9CA3AF;font-size:11px;padding-top:4px">… 显示前3条</div>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    },
  },
  {
    label: "生成报告",
    title: "步骤四：生成异常报告",
    desc: "根据对比结果生成异常报告。",
    logs: ["生成异常报告", "发送报告至：药品溯源管理员", "报告发送成功"],
    content: function () {
      return (
        '<div style="background:#FFFBEB;border:1px solid #FEF3C7;border-radius:8px;padding:12px">' +
        '<div style="font-size:12px;font-weight:500;color:#92400E;margin-bottom:8px">📋 异常报告摘要</div>' +
        '<div style="display:flex;flex-wrap:gap:12px;font-size:11px;color:var(--color-text-secondary)">' +
        '<div style="margin-right:16px">• 缺失监管码：36条</div>' +
        '<div style="margin-right:16px">• 多余监管码：28条</div>' +
        '<div style="margin-right:16px">• 待人工处理：64条</div>' +
        "<div>• 报告已发送至：药品溯源管理员</div>" +
        "</div>" +
        "</div>"
      );
    },
  },
  {
    label: "完成上传",
    title: "步骤五：完成上传",
    desc: "正常数据批量上传至国家药品追溯平台。",
    logs: [
      "开始上传监管码至追溯平台",
      "批量上传完成：2,146条成功上传",
      "本次任务执行完毕，耗时1分18秒",
    ],
    content: function () {
      return (
        '<div class="result-grid anim-row">' +
        '<div class="result-card"><div class="result-num" style="color:#534AB7">2,346</div><div class="result-lbl">原始数据</div></div>' +
        '<div class="result-card"><div class="result-num" style="color:#3B6D11">2,146</div><div class="result-lbl">成功上传</div></div>' +
        '<div class="result-card"><div class="result-num" style="color:#E24B4A">200</div><div class="result-lbl">异常处理</div></div>' +
        '<div class="result-card"><div class="result-num">91.5%</div><div class="result-lbl">成功率</div></div>' +
        '<div class="result-card"><div class="result-num" style="color:#0F6E56">1.3min</div><div class="result-lbl">总耗时</div></div>' +
        '<div class="result-card"><div class="result-num" style="color:#0F6E56">119h</div><div class="result-lbl">月节省工时</div></div>' +
        "</div>"
      );
    },
  },
];

export const statsData = [
  { label: "今日执行任务", value: "28", trend: "+12%" },
  { label: "自动流程覆盖率", value: "76%", trend: "+8%" },
  { label: "任务成功率", value: "98.5%", trend: "+0.5%" },
  { label: "运行中任务", value: "3", trend: "" },
];
