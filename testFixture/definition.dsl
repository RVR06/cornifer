workspace "name" "description" {
	!identifiers hierarchical
	!impliedRelationships false
	
	model {
		person = person "name" "description" "tags"
		group "name" {
			system = softwareSystem "name" "description" "tags" {
				
			}
		}
		
		person -> system "description" "technology" "tags"
		person -> system2 "description" "technology" "tags"
		
		!element obs {
			tags "#external"
		}
		
		system -> obs "description" "technology" "tags"
		
		!element aaa.bbb {
			tags "#external"
		}
		
		system -> aaa.bbb.ccc "description" "technology" "tags"
		
	}
	views {
		!include fragment.views.dslf
	}
}
