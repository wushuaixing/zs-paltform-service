<template>
	<a-row class="row-layout_item">
		<a-col :span="layout[0]">
			<div class="row-layout_item-title ">
				<slot name="title"/>
			</div>
		</a-col>
		<a-col :span="layout[1]">
			<div class="row-layout_item-content">
				<slot name="content"/>
			</div>
		</a-col>
	</a-row>
</template>

<script>
	export default {
		name:'RowLayout',
		props:{
			layout:{
				type:Array,
				default:()=>[8,16]
			}
		}
	}
</script>

<style lang="scss">
	.row-layout_item{
		&-title{
			font-size: $text-title;
		}
		&-content{
			font-size: $text-content;
		}
	}

</style>
