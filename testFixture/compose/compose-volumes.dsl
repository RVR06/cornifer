workspace "compose_volumes" "Auto-generated from compose-volumes.yaml" {
	!identifiers hierarchical
	!impliedRelationships false
	model {
		ouroboros = softwareSystem "ouroboros" "" ""
		redis = softwareSystem "redis" "" "#external"
		traceview = softwareSystem "traceview" "" "#external"
		plantuml_server = softwareSystem "plantuml_server" "" "#external"
		data = softwareSystem "data" "" "#external, #file"
		ouroboros -> data "mounts" "" ""
		compose_volumes_ = deploymentEnvironment "compose_volumes" {
			deploymentNode "Orchestration" "" "Docker Compose" "#docker" 1 {
				deploymentNode "ouroboros:1.0.0" "registry: daedalus.azurecr.io" "Docker" "#docker" 1 {
					ouroboros_ = softwareSystemInstance ouroboros "" ""
				}
				deploymentNode "redis:latest" "" "Docker" "#docker" 1 {
					redis_ = softwareSystemInstance redis "" "#external"
				}
				deploymentNode "rogeralsing/traceview:amd64" "registry: docker.io" "Docker" "#docker" 1 {
					traceview_ = softwareSystemInstance traceview "" "#external"
				}
				deploymentNode "plantuml/plantuml-server:tomcat" "" "Docker" "#docker" 1 {
					plantuml_server_ = softwareSystemInstance plantuml_server "" "#external"
				}
				data_ = softwareSystemInstance data "" "#external"
			}
		}
	}
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json
		deployment * compose_volumes_ "compose_volumes" "" {
			include *
			autoLayout
		}
	}
}