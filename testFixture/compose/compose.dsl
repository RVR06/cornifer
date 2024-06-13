workspace "compose" "Auto-generated from compose.yaml" {
	!identifiers hierarchical
	!impliedRelationships false
	model {
		ouroboros = softwareSystem "ouroboros" "" ""
		postgres = softwareSystem "postgres" "" "#external"
		tracelens = softwareSystem "tracelens" "" "#external"
		plantuml_server = softwareSystem "plantuml_server" "" "#external"
		compose_ = deploymentEnvironment "compose" {
			deploymentNode "Orchestration" "" "Docker Compose" "#docker" 1 {
				deploymentNode "ouroboros:1.0.0" "registry: daedalus.azurecr.io" "Docker" "#docker" 1 {
					ouroboros_ = softwareSystemInstance ouroboros "" ""
				}
				deploymentNode "postgres:16.2-alpine3.19" "" "Docker" "#docker" 1 {
					postgres_ = softwareSystemInstance postgres "" "#external"
				}
				deploymentNode "rogeralsing/tracelens" "registry: docker.io" "Docker" "#docker" 1 {
					tracelens_ = softwareSystemInstance tracelens "" "#external"
				}
				deploymentNode "plantuml/plantuml-server:tomcat" "" "Docker" "#docker" 1 {
					plantuml_server_ = softwareSystemInstance plantuml_server "" "#external"
				}
			}
		}
	}
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json
		deployment * compose_ "compose" "" {
			include *
			autoLayout
		}
	}
}