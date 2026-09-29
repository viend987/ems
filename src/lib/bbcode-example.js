/**
 * Contoh isi untuk BBCode Builder: Patient Care Report, persis seperti yang
 * dipakai di forum. Dipasang lewat tombol "Muat contoh" pada editor yang masih
 * kosong, dan sekaligus jadi bahan uji pengurai — di dalamnya ada `[/LIST]`
 * berhuruf besar, `[hr][/hr]` yang berpasangan, dan satu `[list]` yang tidak
 * pernah ditutup sampai `[/divbox]` di ujung.
 */

export const PATIENT_CARE_REPORT = `[divbox=white][center][img-resize=200]https://i.postimg.cc/YSmH9hxj/image.png[/img-resize]
[hr][/hr]
[size=150][b]Patient Care Report[/b][/size]
[hr][/hr]
[/center][divbox=maroon][b][color=#FFFFFF][center][size=150]PERSONAL DETAILS[/size][/center][/color][/b][/divbox]
[list=0][*][b]Name[/b] : 
[*][b]Badge Number[/b] :
[*][b]Rank[/b] :
[*][b]District[/b] :
[*][b]Callsign[/b] :
[*][b]Duty Partner [/b] (if any) :
[/list]

[divbox=maroon][b][color=#FFFFFF][center][size=150]DUTY INFORMATION[/size][/center][/color][/b][/divbox]
[list=0][*][b]Date[/b] :
[*][b]Time[/b] :
[*][b]Location[/b] :
[*][b]Dispatch[/b] : 911 Request / Department Request / Other (......)[/LIST]

[divbox=maroon][b][color=#FFFFFF][center][size=150]PATIENT INFORMATION[/size][/center][/color][/b][/divbox]
[list][*][b]Triage[/b] (If necessary) : Black / Red / Yellow / Green
[*][b]Level of Consciousness[/b] : Alert / Verbal / Pain Stimuli / Unresponsive
[*][b]Breath per minute[/b] :
[*][b]Pulse per minute[/b] :
[*][b]Patient Condition[/b] : GSW / Fracture / Burn / Cut / Other (......)
[*][b]Summary of Action [/b]:
[*][b]Screen Shot[/b] :
[spoiler][/spoiler]


[right][b]Regards,[/b]
[i]Signature[/i]
Name[/right][/divbox]`

export default PATIENT_CARE_REPORT
