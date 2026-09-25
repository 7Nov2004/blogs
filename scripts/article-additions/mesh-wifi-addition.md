
## Mesh Nodes कहाँ Place करें

Mesh WiFi system खरीद लिया — लेकिन nodes कहाँ रखोगे, यही decide करता है कि performance शानदार होगी या बेकार।

### Dead Zone Mapping पहले करो

पहले अपने घर का mental map बनाओ। हर कमरे में phone लेकर जाओ और **WiFi Analyzer app** (Android पर free मिलती है) से signal strength note करो। जहाँ -70 dBm से नीचे जाए — वो तुम्हारा dead zone है, वहीं node चाहिए।

### Best Placement Tips

- **Primary node** को main router/modem के पास रखो — ideally wired connection के साथ
- Nodes के बीच distance **10–12 मीटर** से ज़्यादा मत रखो (walls के साथ और कम करो)
- **दो nodes के बीच** में कम से कम एक node होना चाहिए अगर घर बड़ा हो
- Nodes को **floor level पर मत रखो** — कम से कम 1–1.5 मीटर की height पर रखो
- Thick concrete walls, mirrors, और microwave ovens signal block करते हैं — इनसे दूर रखो

### Elevation Considerations

Signal सभी directions में travel करता है — ऊपर-नीचे भी। 2-storey घर में:

- Ground floor node को ऊपर ceiling के पास रखो
- First floor node को niche की side में रखो
- दोनों floors के बीच overlap ज़रूरी है — coverage gap नहीं होना चाहिए

---

## Wired vs Wireless Backhaul

Mesh system में nodes आपस में कैसे बात करते हैं — यही **backhaul** है। और यह choice तुम्हारी speed पर बहुत बड़ा impact डालती है।

### क्या होता है Backhaul में?

**Wireless backhaul** में nodes WiFi के ज़रिए आपस में communicate करते हैं — यह convenient है लेकिन bandwidth share होती है। **Wired backhaul** में Ethernet cable से nodes connect होते हैं — full-speed, zero interference।

### Speed Impact Comparison

| Factor | Wireless Backhaul | Wired Backhaul |
|---|---|---|
| **Setup Difficulty** | Easy — बस plug & play | Medium — cabling चाहिए |
| **Max Throughput** | 40–60% drop हो सकती है | Full ISP speed मिलती है |
| **Latency** | 5–15ms added | <1ms added |
| **Interference Risk** | High — channel congestion | None |
| **Ideal For** | Rental homes, renters | Owned homes, power users |
| **Cost** | Extra cost नहीं | Ethernet cable + labour |

अगर घर में पहले से Ethernet wiring है — **wired backhaul ज़रूर use करो।** Gaming और video calls में फ़र्क साफ़ दिखेगा।

---

## India में Top Mesh Systems under ₹10,000

Budget tight है तो भी अच्छे options मौजूद हैं। नीचे India में available best mesh systems की comparison है:

| System | Price (Approx.) | Coverage | Speed (Max) | Nodes | Best For |
|---|---|---|---|---|---|
| **TP-Link Deco M4 (2-pack)** | ₹5,999 | 260 sq.m | AC1200 | 2 | Small flats, 2BHK |
| **TP-Link Deco XE75 (2-pack)** | ₹9,499 | 370 sq.m | AXE5400 | 2 | 3BHK, heavy users |
| **Tenda Nova MW6 (3-pack)** | ₹4,999 | 500 sq.m | AC1200 | 3 | Budget-friendly, large homes |
| **Netgear Orbi RBK13 (3-pack)** | ₹8,999 | 400 sq.m | AC2200 | 3 | Premium feel, easy app |

> **Best Value Pick:** Tenda Nova MW6 — 3 nodes, बड़ी coverage, ₹5000 से कम। 2BHK से 3BHK तक आराम से handle करता है।

TP-Link Deco की app बहुत polished है और parental controls भी मिलते हैं — family use के लिए ideal।

---

## Poor Mesh Performance Troubleshoot करो

Mesh लगाया और फिर भी speed कम है? Panic मत करो — यह common problems हैं और solutions भी आसान हैं।

### Channel Interference

अगर neighbors के WiFi networks तुम्हारे जैसे channels use कर रहे हैं तो interference होगी।

- Router app में जाओ → **WiFi Settings** → Auto Channel को manually set करो
- 2.4GHz पर channel 1, 6, या 11 use करो — overlap कम होता है
- 5GHz को prefer करो जहाँ possible हो — कम congested होता है

### Node Distance Problem

अगर दो nodes के बीच signal बहुत weak है तो roaming smooth नहीं होगा — devices hang करेंगे।

- Nodes को **closer लाओ** — 8–10 मीटर ideal है walls के साथ
- Node के बीच में एक और node add करो अगर घर बड़ा है

### Firmware Update — सबसे पहले यही करो

बहुत बार slow performance का reason outdated firmware होता है।

| Problem | Possible Cause | Fix |
|---|---|---|
| Speed अचानक कम हो गई | Channel congestion | Channel manually set करो |
| एक node पर connect नहीं हो रहा | Distance बहुत ज़्यादा | Node relocate करो |
| Internet बार-बार disconnect होती है | Firmware bug | App से update करो |
| App से nodes दिख नहीं रहे | Factory reset needed | Reset करके re-add करो |

TP-Link Deco और Netgear Orbi दोनों में automatic firmware update feature है — उसे **always ON** रखो। एक firmware update ने कई users की speed literally double कर दी है।
