# © 2022 DAEDALUS, Inc.  Unauthorized use, distribution, or duplication is prohibited.

!constant FRONTEND "Focus on frontend"
!constant BACKEND "Focus on backend"

workspace "MILA" "Multiple Images Lightweight Acquisition" {
	!identifiers hierarchical
	!impliedRelationships false
	
	model {
		matt = person "Material scientist" "Leverages smartphone facilities to capture materials properties." ""
		simon = person "Simulation engineer" "Crafts physics-based simulation." ""
		
		enterprise "DAEDALUS" {
			mila = softwareSystem "MILA" "Provides lightweight material acquisition facilities & crafts self-contained material assets." "" {
				spa = container "Web application" "Provides limited facilities to upload constrained pictures set." "Blazor" "#web" {
					perspectives {
						frontend "${FRONTEND}"
					}
				}
				mobile = container "Mobile application" "Provides uncluttered interface to ease pictures shooting, stiching & uploding." "Xamarin" "#mobile" {
					perspectives {
						frontend "${FRONTEND}"
					}
					acquisition = component "Acquisition" "Handles smartphone built-in capabilities." "" "" {
					}
					preparation = component "Preparation" "Provides images tooling such as cropping & stitching facilities." "" "" {
					}
					uploading = component "Uploading" "Handles back-edn communication." "" "" {
					}
				}
				api = container "API application" "Extracts spatially varying BRDF-Cook-Torrance with normals, diffuse, roughness & specular maps from pictures set leveraring deep neural network." "" "" {
					perspectives {
						backend "${BACKEND}"
					}
				}
				store = container "Materials store" "Stores enriched materials & supplies powerful queries API." "MongoDB" "#db" {
					perspectives {
						backend "${BACKEND}"
					}
				}
			}
			vrxp = softwareSystem "VRXPERIENCE" "Provides powerful facilities to work with physics materials." "#external" {
				url https://github.com/rvr06/cornifer
			}
		}
		
		matt -> mila "Sends pictures to" "" ""
		matt -> mila.spa "Uses" "" ""
		matt -> mila.mobile "Uses" "" ""
		
		simon -> vrxp "Uses" "" ""
		
		vrxp -> mila "Fetches materials from" "" ""
		vrxp -> mila.store "Fetches materials from" "" ""
		
		mila.spa -> mila.api "Makes API call to" "" ""
		mila.mobile -> mila.api "Makes API call to" "" ""
		mila.api -> mila.store "Stores materials to" "" ""
		
		mila.mobile.acquisition -> mila.mobile.preparation "Feeds" "" ""
		mila.mobile.preparation -> mila.mobile.uploading "Packages" "" ""
		
		!include fragments/observability.model.dslf
		
		!ref obs {
			tags "#external"
		}
		
		system -> obs "description" "technology" "tags"
		
		dev_ = deploymentEnvironment "dev" {
			deploymentNode "User workstation" "" "Mircrosoft Windows 10" "#windows" 1 {
				
				deploymentNode "Web browser" "" "Opera" "#opera" 1 {
					spa_ = containerInstance mila.spa "" "" {
					}
				}
				
				vrxp_ = softwareSystemInstance vrxp "" "#daedalus_" {
				}
				
				deploymentNode "Virtual device" "" "Android" "#android" 1 {
					mobile_ = containerInstance mila.mobile "" "" {
					}
				}
				
				deploymentNode "Orchestration" "" "Docker-compose" "#dockerCompose" 1 {
					deploymentNode "mcr.microsoft.com/dotnet/aspnet:6.0" "" "Docker" "#docker" 1 {
						api_ = containerInstance mila.api deploymentGroup_identifier "" {
							healthCheck "API is up & running" "http://localhost:5000/healthz" 60 0
						}
					}
					
					deploymentNode "mongo:latest" "" "Docker" "#docker" 1 {
						url https://hub.docker.com/_/mongo
						store_ = containerInstance mila.store "" "" {
						}
					}
				}
			}
		}
		
		prod_ = deploymentEnvironment "prod" {
			worker1_ = deploymentGroup "Worker 01"
			worker2_ = deploymentGroup "Worker 02"
			
			ws_ = deploymentNode "Matt workstation" "" "Mircrosoft Windows 10" "#windows" 1 {
				
				browser_ = deploymentNode "Web browser" "" "Opera" "#opera" 1 {
					spa_ = containerInstance mila.spa "" "" {
					}
				}
			}
			deploymentNode "Simon workstation" "" "Mircrosoft Windows 10" "#windows" 1 {
				vrxp_ = softwareSystemInstance vrxp worker1_,worker2_ "#daedalus_" {
				}
			}
			
			phone_ = deploymentNode "Mobile device" "" "Android" "#android" 1 {
				mobile_ = containerInstance mila.mobile "" "" {
				}
			}
			
			backend_ = deploymentNode "Backend" "" "Azure" "" 1 {
				gateway_ = infrastructureNode "api.application.com" "" "Application Gateway" "Microsoft Azure - Application Gateways"
				
				w01_ = deploymentNode "Worker 01" "" "Azure" "Microsoft Azure - All Resources" 1 {
					k8s_ = deploymentNode "Orchestration" "" "Kubernetes" "Microsoft Azure - Kubernetes Services" 1 {
						docker_ = deploymentNode "mcr.microsoft.com/dotnet/aspnet:6.0" "" "Docker" "Microsoft Azure - Container Instances" 1 {
							api_ = containerInstance mila.api worker1_ "#healthy" {
							}
						}
						
						deploymentNode "mongo:latest" "" "Docker" "Microsoft Azure - Container Instances" 1 {
							url https://hub.docker.com/_/mongo
							store_ = containerInstance mila.store worker1_ "#blurry" {
							}
						}
					}
				}
				
				w02_ = deploymentNode "Worker 02" "" "Azure" "Microsoft Azure - All Resources" 1 {
					k8s_ = deploymentNode "Orchestration" "" "Kubernetes" "Microsoft Azure - Kubernetes Services" 1 {
						docker_ = deploymentNode "mcr.microsoft.com/dotnet/aspnet:6.0" "" "Docker" "Microsoft Azure - Container Instances" 1 {
							api_ = containerInstance mila.api worker2_ "#faulty" {
							}
						}
						
						deploymentNode "mongo:latest" "" "Docker" "Microsoft Azure - Container Instances" 1 {
							url https://hub.docker.com/_/mongo
							store_ = containerInstance mila.store worker2_ "#healthy" {
							}
						}
					}
				}
			}
			
			prod_.phone_.mobile_ -> prod_.backend_.gateway_ "Makes API call to" "" ""
			prod_.ws_.browser_.spa_ -> prod_.backend_.gateway_ "Makes API call to" "" ""
			
			prod_.backend_.gateway_ -> prod_.backend_.w01_.k8s_.docker_.api_ "Routes incoming calls to" "" ""
			prod_.backend_.gateway_ -> prod_.backend_.w02_.k8s_.docker_.api_ "Routes incoming calls to" "" ""
		}
	}
	
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic/theme.json
		
		!include fragments/observability.views.dslf
		
		# C4.L
		systemLandscape "SystemLandscape" "" {
			include *
			autolayout
		}
		
		# C4.1
		systemContext mila "SystemContext" "" {
			include *
			autolayout
		}
		
		# C4.2
		container mila "Container" "" {
			include *
			animation {
				matt
				mila.spa mila.mobile
				mila.api
				mila.store
				vrxp
			}
			autolayout
		}
		
		filtered "Container" exclude "#web" "Container-mobile-filter" ""
		filtered "Container" include "Person, Relationship, #mobile, #web" "Container-frontend-filter" ""
		filtered "Container" exclude "" "Container-full" ""
		
		# C4.3
		component mila.mobile "mile_mobile-4_3" "" {
			include *
			autolayout lr
		}
		
		# C4.W
		dynamic mila "mila-workflow-mobile" "MILA mobile workflow" {
			matt -> mila.mobile
			mila.mobile -> mila.api
			mila.api -> mila.store
			autolayout lr
		}
		
		dynamic mila "mila-workflow-hybrid" "MILA hybrid workflow" {
			{
				matt -> mila.mobile
				mila.mobile -> mila.api
				mila.api -> mila.store
			}
			{
				matt -> mila.spa
				mila.spa -> mila.api
				mila.api -> mila.store
			}
			autolayout lr
		}
		
		# C4.D
		deployment * dev_ "DevDeployment" "" {
			include *
			autolayout lr
		}
		
		deployment * prod_ "ProdDeployment" "" {
			include *
			autolayout lr
		}
		
		styles {
			element "#api" {
			}
			relationship "#rest" {
			}
		}
	}
}
