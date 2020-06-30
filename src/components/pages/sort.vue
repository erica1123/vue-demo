<template>
  <div class="sort">
    <table class="table">
			<thead>
				<tr>
					<th>品名</th>
					<th class="click">價格 
						<span class="icon">
							<i class=" fas fa-angle-up text-success"></i>
						</span>
					</th>
					<th class="click">到期日
						<span class="icon">
							<i class=" fas fa-angle-up text-success"></i>
						</span>
					</th>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</thead>
		</table>
  </div>
</template>

<script>
export default {
  name: 'TableSort',
  data () {
    return {
    }
  }
}
</script>

