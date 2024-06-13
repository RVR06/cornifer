workspace "compose_depends_on_verbose" "Auto-generated from compose-depends_on_verbose.yaml" {
	!identifiers hierarchical
	!impliedRelationships false
	model {
		aaa = softwareSystem "aaa" "" "#external"
		bbb = softwareSystem "bbb" "" "#external"
		ccc = softwareSystem "ccc" "" "#external"
		aaa -> bbb "depends on" "" ""
		aaa -> ccc "depends on" "" ""
		bbb -> ccc "depends on" "" ""
		compose_depends_on_verbose_ = deploymentEnvironment "compose_depends_on_verbose" {
			deploymentNode "Orchestration" "" "Docker Compose" "#docker" 1 {
				deploymentNode "aaa:1.2.3" "" "Docker" "#docker" 1 {
					aaa_ = softwareSystemInstance aaa "" "#external"
				}
				deploymentNode "bbb:1.2.3" "" "Docker" "#docker" 1 {
					bbb_ = softwareSystemInstance bbb "" "#external"
				}
				deploymentNode "bbb:1.2.3" "" "Docker" "#docker" 1 {
					ccc_ = softwareSystemInstance ccc "" "#external"
				}
			}
		}
	}
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json
		deployment * compose_depends_on_verbose_ "compose_depends_on_verbose" "" {
			include *
			autoLayout
		}
	}
}