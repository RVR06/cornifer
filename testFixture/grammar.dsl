workspace "workspace" "description"  {
	!identifiers hierarchical
	!impliedRelationships false
	
	model {
		person_one_liner_123 = person "person_one_liner_123" "description" "tags"
		person_one_liner_12 = person "person_one_liner_12" "description"
		person_one_liner_1 = person "person_one_liner_1"
		
		person_123 = person "person_123" "description" "tags" {
		}
		person_12 = person "person_12" "description" {
		}
		person_1 = person "person_1" {
			url	https://foo.bar
		}
		
		softwareSystem_one_liner_123 = softwareSystem "softwareSystem_one_liner_123" "description" "tags"
		softwareSystem_one_liner_12 = softwareSystem "softwareSystem_one_liner_12" "description"
		softwareSystem_one_liner_1 = softwareSystem "softwareSystem_one_liner_1"
		
		softwareSystem_123 = softwareSystem "softwareSystem_123" "description" "tags" {
		}
		softwareSystem_12 = softwareSystem "softwareSystem_12" "description" {
		}
		softwareSystem_1 = softwareSystem "softwareSystem_1"  {
			
			container_one_liner_1234 = container "container_one_liner_1234" "description" "technology" "tags"
			container_one_liner_123 = container "container_one_liner_123" "description" "technology"
			container_one_liner_12 = container "container_one_liner_12" "description"
			container_one_liner_1 = container "container_one_liner_1"
			
			container_1234 = container "container_1234" "description" "technology" "tags" {
			}
			container_123 = container "container_123" "description" "technology"  {
			}
			container_12 = container "container_12" "description"  {
			}
			container_1 = container "container_1"  {
				component_oneliner_1234 = component "component_oneliner_1234" "description" "technology" "tags"
				component_oneliner_123 = component "component_oneliner_123" "description" "technology"
				component_oneliner_12 = component "component_oneliner_12" "description"
				component_oneliner_1 = component "component_oneliner_1"
				
				component_1234 = component "component_1234" "description" "technology" "tags" {
				}
				component_123 = component "component_123" "description" "technology" {
				}
				component_12 = component "component_12" "description" {
				}
				component_1 = component "component_1" {
				}
			}
		}
		
		person_1 -> softwareSystem_1 "relationship_123" "technology" "tags"
		person_1 -> softwareSystem_1 "relationship_12" "technology"
		person_1 -> softwareSystem_1 "relationship_1"
		person_1 -> softwareSystem_1
		
		person_1 -> softwareSystem_1.container_1 "relationship_123" "technology" "tags"
		person_1 -> softwareSystem_1.container_1 "relationship_12" "technology"
		person_1 -> softwareSystem_1.container_1 "relationship_1"
		person_1 -> softwareSystem_1.container_1
		
		person_1 -> softwareSystem_1.container_1.component_1 "relationship_123" "technology" "tags"
		person_1 -> softwareSystem_1.container_1.component_1 "relationship_12" "technology"
		person_1 -> softwareSystem_1.container_1.component_1 "relationship_1"
		person_1 -> softwareSystem_1.container_1.component_1
		
		softwareSystem_1.container_1 -> person_1 "relationship_123" "technology" "tags"
		softwareSystem_1.container_1 -> person_1 "relationship_12" "technology"
		softwareSystem_1.container_1 -> person_1 "relationship_1"
		softwareSystem_1.container_1 -> person_1
		
		softwareSystem_1.container_1.component_1 -> person_1 "relationship_123" "technology" "tags"
		softwareSystem_1.container_1.component_1 -> person_1 "relationship_12" "technology"
		softwareSystem_1.container_1.component_1 -> person_1 "relationship_1"
		softwareSystem_1.container_1.component_1 -> person_1
		
		person_implicit = person "person_implicit" "description" "tags" {
			-> softwareSystem_one_liner_123 "implicit_relationship_123" "technology" "tags"
			-> softwareSystem_one_liner_123 "implicit_relationship_12" "technology"
			-> softwareSystem_one_liner_123 "implicit_relationship_1"
			-> softwareSystem_one_liner_123
		}
		
		unamed_instances_ = deploymentEnvironment "unamed_instances" {
			deploymentGroup_ = deploymentGroup "deploymentGroup"
			deploymentGroup2_ = deploymentGroup "deploymentGroup2"
			
			deploymentNode_12345 = deploymentNode "deploymentNode_12345" "description" "technology" "tags" 1 {
				softwareSystemInstance softwareSystem_12 deploymentGroup_,deploymentGroup2_ "tags"
				softwareSystemInstance softwareSystem_12 deploymentGroup_ "tags"
				softwareSystemInstance softwareSystem_12 "" "tags"
				softwareSystemInstance softwareSystem_12 ""
				softwareSystemInstance softwareSystem_12
				
				containerInstance softwareSystem_1.container_1 deploymentGroup_,deploymentGroup2_ "tags"
				containerInstance softwareSystem_1.container_1 deploymentGroup_ "tags"
				containerInstance softwareSystem_1.container_1 "" "tags"
				containerInstance softwareSystem_1.container_1 ""
				containerInstance softwareSystem_1.container_1
			}
		}
		
		one_liner_instances_ = deploymentEnvironment "one_liner_instances" {
			deploymentNode_1234 = deploymentNode "deploymentNode_1234" "description" "technology" "tags" {
				softwareSystemInstance_oneliner_123 = softwareSystemInstance softwareSystem_1 "" "tags"
				softwareSystemInstance_oneliner_12 = softwareSystemInstance softwareSystem_1 ""
				softwareSystemInstance_oneliner_1 = softwareSystemInstance softwareSystem_1
				
				containerInstance_oneliner_123 = containerInstance softwareSystem_1.container_1 "" "tags"
				containerInstance_oneliner_12 = containerInstance softwareSystem_1.container_1 ""
				containerInstance_oneliner_1 = containerInstance softwareSystem_1.container_1
			}
		}
		
		instances_ = deploymentEnvironment "instances" {
			deploymentNode_123 = deploymentNode "deploymentNode_123" "description" "technology" {
				softwareSystemInstance_123 = softwareSystemInstance softwareSystem_12 "" "tags" {
				}
				softwareSystemInstance_12 = softwareSystemInstance softwareSystem_12 "" {
				}
				softwareSystemInstance_1 = softwareSystemInstance softwareSystem_12 {
				}
				
				container_identifier_123 = containerInstance softwareSystem_1.container_1 "" "tags" {
				}
				container_identifier_12 = containerInstance softwareSystem_1.container_1 "" {
				}
				container_identifier_1 = containerInstance softwareSystem_1.container_1 {
				}
			}
		}
		
		infrastructure_ = deploymentEnvironment "infrastructure" {
			deploymentNode_12 = deploymentNode "deploymentNode_12" "description" {
				infrastructureNode_1234 = infrastructureNode "infrastructureNode_1234" "description" "technology" "tags" {
				}
				infrastructureNode_123 = infrastructureNode "infrastructureNode_123" "description" "technology" {
				}
				infrastructureNode_12 = infrastructureNode "infrastructureNode_12" "description"  {
				}
				infrastructureNode_1 = infrastructureNode "infrastructureNode_1" {
				}
			}
		}
		
		oneliner_infrastructure_ = deploymentEnvironment "oneliner_infrastructure" {
			deploymentNode_1 = deploymentNode "deploymentNode_1" {
				infrastructureNode_oneliner_1234 = infrastructureNode "infrastructureNode_oneliner_1234" "description" "technology" "tags"
				infrastructureNode_oneliner_123 = infrastructureNode "infrastructureNode_oneliner_123" "description" "technology"
				infrastructureNode_oneliner_12 = infrastructureNode "infrastructureNode_oneliner_12" "description"
				infrastructureNode_oneliner_1 = infrastructureNode "infrastructureNode_oneliner_1"
			}
		}
	}
	
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		
		systemLandscape "systemLandscape_12" "description" {
			include *
		}
		systemLandscape "systemLandscape_1" {
			include *
		}
		
		systemContext softwareSystem_1 "systemContext_view_12" "description" {
			include *
		}
		
		systemContext softwareSystem_1 "systemContext_view_1" {
			include *
		}
		
		systemContext softwareSystem_1 {
			include *
		}
		
		container softwareSystem_1 "container_view_12" "description" {
			include *
		}
		
		container softwareSystem_1 "container_view_1" {
			include *
		}
		
		container softwareSystem_1 {
			include *
		}
		
		filtered "container_view_12" include "tags" "filtered_view_12" "description"
		filtered "container_view_12" include "tags" "filtered_view_1"
		filtered "container_view_12" include "tags"
		
		component softwareSystem_1.container_1 "component_view_12" "description" {
			include *
		}
		component softwareSystem_1.container_1 "component_view_1" {
			include *
		}
		component softwareSystem_1.container_1 {
			include *
		}
		
		dynamic * "dynamic_12" "description" {
			person_1 -> softwareSystem_1 "refined_relationship_123" "technology"
			person_1 -> softwareSystem_1 "custom_relationship_123"
			person_1 -> softwareSystem_1
		}
		
		dynamic * "dynamic_1" {
			person_1 -> softwareSystem_1 "refined_relationship_123" "technology"
			person_1 -> softwareSystem_1 "custom_relationship_123"
			person_1 -> softwareSystem_1
		}
		
		dynamic * {
			person_1 -> softwareSystem_1 "refined_relationship_123" "technology"
			person_1 -> softwareSystem_1 "custom_relationship_123"
			person_1 -> softwareSystem_1
			
			person_1 -> softwareSystem_1.container_1 "refined_relationship_123" "technology"
			person_1 -> softwareSystem_1.container_1 "custom_relationship_123"
			person_1 -> softwareSystem_1.container_1
			
			person_1 -> softwareSystem_1.container_1.component_1 "refined_relationship_123" "technology"
			person_1 -> softwareSystem_1.container_1.component_1 "custom_relationship_123"
			person_1 -> softwareSystem_1.container_1.component_1
			
			softwareSystem_1.container_1 -> person_1 "refined_relationship_123" "technology"
			softwareSystem_1.container_1 -> person_1 "custom_relationship_123"
			softwareSystem_1.container_1 -> person_1
			
			softwareSystem_1.container_1.component_1 -> person_1 "refined_relationship_123" "technology"
			softwareSystem_1.container_1.component_1 -> person_1 "custom_relationship_123"
			softwareSystem_1.container_1.component_1 -> person_1
		}
		
		deployment * instances_ "C4_D_instances_" "description" {
			include *
		}
		
		deployment * unamed_instances_ "C4_D_unamed_instances_" {
			include *
		}
		
		deployment * one_liner_instances_ {
			include *
		}
		
	}
}