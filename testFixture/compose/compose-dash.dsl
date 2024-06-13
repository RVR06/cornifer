workspace "compose_dash" "Auto-generated from compose-dash.yaml" {
	!identifiers hierarchical
	!impliedRelationships false
	model {
		xxx_yyy_zzz = softwareSystem "xxx_yyy_zzz" "" "#external"
		compose_dash_ = deploymentEnvironment "compose_dash" {
			deploymentNode "Orchestration" "" "Docker Compose" "#docker" 1 {
				deploymentNode "xxx-yyy-zzz" "" "Docker" "#docker" 1 {
					xxx_yyy_zzz_ = softwareSystemInstance xxx_yyy_zzz "" "#external"
				}
			}
		}
	}
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json
		deployment * compose_dash_ "compose_dash" "" {
			include *
			autoLayout
		}
	}
}