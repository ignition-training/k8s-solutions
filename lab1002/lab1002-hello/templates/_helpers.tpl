{{/*
We're going to provide some of the recommended labels
*/}}
{{- define "recommendedlabels" }}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
