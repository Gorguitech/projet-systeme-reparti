import jenkins.model.*
import org.jenkinsci.plugins.workflow.job.*
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition

def jobName = "motos-app-pipeline"
def instance = Jenkins.getInstance()

if (instance.getItem(jobName) == null) {

    def job = instance.createProject(WorkflowJob, jobName)

    job.setDefinition(new CpsFlowDefinition(
        new File("/workspace/jenkins/Jenkinsfile").text,
        true
    ))

    job.save()
    println("Pipeline créé avec succès")
} else {
    println("Le pipeline existe déjà")
}