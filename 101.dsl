# Comment
workspace "name" "description" {
	!identifiers hierarchical
	!impliedRelationships false
	!docs .
	
	# Comment
	model {
		# Comment
		user = person "name" "description" "tags"
		enterprise "name" {
			# Comment
			system1 = softwareSystem "name" "description" "tags" {
				# Comment
				container1 = container "name" "description" "technology" "tags" {
					# Comment
					url https://container.com/
					component1 = component "name" "description" "technology" "tags" {
						# Comment
					}
					component2 = component "name" "description" "technology" "tags" {
					}
				}
				container2 = container "name" "description" "technology" "tags" {
					
				}
			}
		}
		
		system2 = softwareSystem "name" "description" "tags" {
		}
		
		system3 = softwareSystem "name" "description" "tags" {
			# Comment
			url http://softwareSystem.com/
			container1 = container "name" "description" "technology" "tags" {
				# Comment
				component1 = component "name" "description" "technology" "tags" {
					# Comment
				}
			}
		}
		
		#region Relationships
		user -> system1 "description" "technology" "tags"
		system1.container1 -> system3.container1 "description" "technology" "tags"
		system1.container1.component1 -> system3.container1.component1 "description" "technology" "tags"
		#endregion
		
		# Complement model by importing fragment
		!include ref.model.dslf
		
		# Amend fragment
		!ref ref {
			tags "#external"
		}
		
		# Plug fragment into ecosystem
		system1 -> ref "description" "technology" "tags"
		system1.container1 -> ref "description" "technology" "tags"
		
		dep_ = deploymentEnvironment "name" {
			# Comment
			group_ = deploymentGroup "name"
			
			dep1_ = deploymentNode "name" "description" "technology" "tags" 2 {
			}
			
			dep2_ = deploymentNode "name" "description" "technology" "tags" 2 {
				deploymentNode "name" "description" "technology" "tags" 34 {
					container11_ = containerInstance system1.container1 group_ "tags" {
					}
				}
			}
			
			dep3_ = deploymentNode "name" "description" "technology" "tags" 2 {
				# Comment
				dep1_ = deploymentNode "name" "description" "technology" "tags" 9 {
					# Comment
					container11_ = containerInstance system1.container1 group_ "tags" {
					}
					system1_ = softwareSystemInstance system1 "" "tags" {
					}
					
					container31_ = containerInstance system3.container1 group_ "tags" {
						# Comment
						url https://containerInstance.com/
						healthCheck "description" http://healthCheck.com/ 60 0
					}
					system2_ = softwareSystemInstance system2 "" "tags" {
						healthCheck "description" https://healthCheck.com/ 60 0
						url http://softwareSystemInstance.com/
						# Comment
					}
					
					inf_ = infrastructureNode "name" "description" "technology" "tags"
				}
			}
		}
	}
	
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		
		styles {
			element "tag_name" {
				colour #color_code
			}
			relationship "tag_name" {
				colour #color_code
			}
		}
		
		# C4.L
		systemLandscape "name" "description" {
			include *
		}
		
		# C4.1
		systemContext overwatch "name" "description" {
			include *
		}
		
		# C4.2
		container overwatch "name" "description" {
			include *
		}
		
		# C4.3
		component overwatch.api "name" "description" {
			include *
		}
		
		# C4.D
		deployment * identifier_ "name" "description" {
			include *
		}
	}
}

